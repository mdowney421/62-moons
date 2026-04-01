import { timingSafeEqual } from "node:crypto";

import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function safeCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Band Member Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = typeof credentials?.username === "string" ? credentials.username : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (!expectedUsername || !expectedPassword) {
          return null;
        }

        if (!safeCompare(username, expectedUsername) || !safeCompare(password, expectedPassword)) {
          return null;
        }

        return {
          id: "band-admin",
          name: "62 Moons Admin",
          email: "admin@62moonsband.com",
        };
      },
    }),
  ],
};

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
