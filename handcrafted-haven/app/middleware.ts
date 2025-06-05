import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const token = req.nextauth?.token;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl)); // Redirect guests
  }

  const userRole = token?.role || "customer"; // Default role is 'customer'

  const isSellerPage = pathname.startsWith("/seller-dashboard");
  const isCustomerPage = pathname.startsWith("/customer-dashboard");

  // Redirect customers away from seller dashboard
  if (isSellerPage && userRole !== "seller") {
    return NextResponse.redirect(new URL("/customer-dashboard", req.nextUrl));
  }

  // Redirect sellers away from customer dashboard
  if (isCustomerPage && userRole === "seller") {
    return NextResponse.redirect(new URL("/seller-dashboard", req.nextUrl));
  }

  return NextResponse.next(); // Allow access
});
