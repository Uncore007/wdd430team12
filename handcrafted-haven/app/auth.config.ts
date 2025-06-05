import type { AuthOptions } from "next-auth";

export const authConfig: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session }) {
      return session; // 
    },

  },
  providers: [], // Add providers later
};
