import { NextRequest, NextResponse } from "next/server";
import { adminAuthMiddleware, userAuthMiddleware } from "./middlewares/auth";

const USER_PROTECTED_ROUTES = {
  page: [],
  api: ["/api/cart/protected/:path*", "/api/user/auth"],
};
const ADMIN_PROTECTED_ROUTES = {
  page: ["/admin/:path*"],
  api: ["/api/product/protected/:path*", "/api/admin/auth"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/user/auth",
    "/api/admin/auth",
    "/api/cart/protected/:path*",
    "/api/user/protected/:path*",
    "/api/admin/:path*",
    "/admin/:path*",
  ],
};
