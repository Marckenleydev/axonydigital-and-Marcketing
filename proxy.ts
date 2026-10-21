import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isCrmApi = pathname === "/api/crm" || pathname.startsWith("/api/crm/");
  const isLogin = pathname === "/admin/login";
  const signedIn = Boolean(request.auth?.user?.id);

  if (isLogin) return NextResponse.next();

  if (signedIn) return NextResponse.next();

  if (isCrmApi) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: ["/admin/:path*", "/api/crm/:path*"],
};
