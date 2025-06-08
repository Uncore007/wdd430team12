import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("userRole")?.value || "guest";

  if (req.nextUrl.pathname.startsWith("/seller-dashboard") && role !== "seller") {
    return NextResponse.redirect("/");
  }
  
  if (req.nextUrl.pathname.startsWith("/reviews") && role !== "customer") {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/seller-dashboard", "/reviews"],
};
