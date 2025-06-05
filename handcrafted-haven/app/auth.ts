import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "../lib/definations"; 
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is not defined");

// Schema validation for credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6), // Ensure password is at least 6 characters
});

// Function to fetch user from PostgreSQL database
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return undefined;
  }
}

// Authentication setup
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials using Zod
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) throw new Error("Invalid credentials");

        const { email, password } = parsedCredentials.data;

        // Fetch user from database
        const user = await getUser(email);
        if (!user) return null;

        // Verify hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // ✅ Store user role in JWT
//         token.id = user.id; // Store user ID
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role; // ✅ Pass role into session
//       session.user.id = token.id; // Pass user ID into session
//       return session;
//     },
//   },


});
