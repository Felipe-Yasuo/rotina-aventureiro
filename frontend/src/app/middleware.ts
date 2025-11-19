import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || null;

    const isPrivate = request.nextUrl.pathname.startsWith("/private") ||
        request.nextUrl.pathname.startsWith("/(private)");

    if (isPrivate && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/(private)/:path*", "/private/:path*"],
};
