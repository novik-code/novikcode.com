import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for multi-domain routing:
 * - densflow.ai / www.densflow.ai  →  serves /densflow/* content
 * - novikcode.com / www.novikcode.com  →  serves normal routes
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // If request comes from densflow.ai domain
  if (host.includes("densflow.ai")) {
    // Already on a /densflow path — let it through (avoid double prefix)
    if (pathname.startsWith("/densflow")) {
      return NextResponse.next();
    }

    // API routes for densflow — rewrite /api/densflow-lead etc.
    if (pathname.startsWith("/api/densflow")) {
      return NextResponse.next();
    }

    // Root of densflow.ai → rewrite to /densflow
    // Any sub-path on densflow.ai → rewrite to /densflow/subpath
    const newPath = pathname === "/" ? "/densflow" : `/densflow${pathname}`;
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, logo.png, etc. (public assets)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|densflow-icon\\.png|densflow-logo-extended\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
