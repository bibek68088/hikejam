import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path === "/blog" ||
    path === "/aboutus" ||
    path === "/destinations" ||
    path === "/gallery" ||
    path === "/contact"

  const isAuthenticated = request.cookies.get("isLoggedIn")?.value === "true"
  const userRole = request.cookies.get("userRole")?.value

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard", request.url))
  }

  if (isAuthenticated && path.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url))
  }

  if (isAuthenticated && path.startsWith("/user/dashboard") && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
