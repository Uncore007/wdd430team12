import type { NextAuthConfig } from 'next-auth';

console.log('[DEBUG] AUTH_SECRET in auth.config.ts:', process.env.AUTH_SECRET);
 
export const authConfig = {
  secret: process.env.AUTH_SECRET, // Ensure this line is present
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Providers are usually defined in auth.ts
} satisfies NextAuthConfig;