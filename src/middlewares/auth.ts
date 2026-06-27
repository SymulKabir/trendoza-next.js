import { NextRequest, NextResponse } from "next/server";
import { ADMIN_TOKEN_KEY, BACKEND_URL, USER_TOKEN_KEY } from "@/src/constants";

const REDIRECT_PATH = "/?auth=sing-in";

export const adminAuthMiddleware = async ({
  request,
  isPage = false,
}: {
  request: NextRequest;
  isPage?: boolean;
}) => {
  try {
    const token = (await request.cookies.get(ADMIN_TOKEN_KEY)?.value) || null;
    if (!token) {
      throw Error("Token not fund");
    }

    const res = await fetch(`${BACKEND_URL}/api/auth/check-token`, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data?.admin) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-admin-id", data.admin.id);
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }

    throw Error("Unauthorized");
  } catch (error) { 
    if (isPage) {
      return NextResponse.redirect(new URL(REDIRECT_PATH, request.url));
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
};
export  const userAuthMiddleware = async ({
  request,
  isPage = false,
}: {
  request: NextRequest;
  isPage?: boolean;
}) => {
  try {
    const token = (await request.cookies.get(USER_TOKEN_KEY)?.value) || null; 

    console.log("token form user auth -=========================>>>>>>>>", token)
    if (!token) {
      throw Error("Token not fund");
    }

    console.log("token ======>>>>", token)
    const res = await fetch(`${BACKEND_URL}/api/auth/check-token`, {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });

    const data = await res.json();
console.log("data  for middle ware--->>", data)

    if (data?.user) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", data.user.id);
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }
    throw Error("Unauthorized");
  } catch (error) {
    if (isPage) {
      return NextResponse.redirect(new URL(REDIRECT_PATH, request.url));
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
};
