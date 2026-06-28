import { NextRequest, NextResponse } from "next/server";
import { adminAuthMiddleware, userAuthMiddleware } from "./middlewares/auth";
import { headerModifyMiddleware } from "./middlewares/updateHeader";

const USER_PROTECTED_ROUTES = {
  page: ["/dashboard/:path*"],
  api: ["/api/cart/protected/:path*", "/api/user/auth", "/api/order/get"],
};
const ADMIN_PROTECTED_ROUTES = {
  page: ["/admin/:path*"],
  api: ["/api/product/protected/:path*", "/api/admin/auth"],
};

const UPDATE_HEADER_ROUTES = ["/api/product"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let requestHeaders = new Headers(request.headers);

  if (UPDATE_HEADER_ROUTES.some((route) => pathname.startsWith(route))) {
    requestHeaders = await headerModifyMiddleware({ request });
  }

  request = new NextRequest(request, {
    headers: requestHeaders,
  });

  if (
    ADMIN_PROTECTED_ROUTES.page.some((route) =>
      pathname.startsWith(route.replace(":path*", "")),
    )
  ) {
    return await adminAuthMiddleware({ request, isPage: true });
  } else if (
    ADMIN_PROTECTED_ROUTES.api.some((route) =>
      pathname.startsWith(route.replace(":path*", "")),
    )
  ) {
    return await adminAuthMiddleware({ request, isPage: false });
  } else if (
    USER_PROTECTED_ROUTES.page.some((route) =>
      pathname.startsWith(route.replace(":path*", "")),
    )
  ) {
    return await userAuthMiddleware({ request, isPage: true });
  } else if (
    USER_PROTECTED_ROUTES.api.some((route) =>
      pathname.startsWith(route.replace(":path*", "")),
    )
  ) {
    return await userAuthMiddleware({ request, isPage: false });
  }
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: [
    "/api/product",
    "/api/user/auth",
    "/api/order/get",
    "/api/admin/auth",
    "/api/cart/protected/:path*",
    "/api/user/protected/:path*",
    "/api/admin/:path*",
    "/admin/:path*",
    "/dashboard/:path*",

  ],
};
