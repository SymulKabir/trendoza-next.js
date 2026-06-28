import { NextRequest, NextResponse } from "next/server";
import { ADMIN_TOKEN_KEY, BACKEND_URL, USER_TOKEN_KEY } from "@/src/constants";

export const headerModifyMiddleware = async ({
  request,
}: {
  request: NextRequest;
}) => {
  const requestHeaders = new Headers(request.headers);
  try {
    const adminToken =
      (await request.cookies.get(ADMIN_TOKEN_KEY)?.value) || null;
    const userToken =
      (await request.cookies.get(USER_TOKEN_KEY)?.value) || null;
    if (adminToken) {
      const res = await fetch(`${BACKEND_URL}/api/auth/check-token`, {
        method: "GET",
        headers: { authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();

        if (data?.admin) {
          requestHeaders.set("x-admin-id", data.admin.id);
        }
      }
    }
    if (userToken) {
      const res = await fetch(`${BACKEND_URL}/api/auth/check-token`, {
        method: "GET",
        headers: { authorization: `Bearer ${userToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("data --from api--------->>>", data)

        if (data?.user) {
          requestHeaders.set("x-user-id", data.user.id);
        }
      }
    }

    return requestHeaders;
  } catch (error) {
    return requestHeaders;
  }
};
