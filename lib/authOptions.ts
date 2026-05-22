import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "./users";
export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({
    name: "credentials", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = await findUserByEmail(credentials.email);
      if (user && user.password === credentials.password) return { id: user.id, email: user.email, name: user.name };
      return null;
    }
  })],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "temporary-secret-for-demo",
};
