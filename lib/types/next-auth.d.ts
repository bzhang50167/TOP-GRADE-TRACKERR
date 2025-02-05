import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name?: string;
      phone?: string;
      isAdmin: boolean;
    };
  }

  interface User extends DefaultUser {
        id: string;
        name?: string;
        phone?: string;
        isAdmin: boolean;
    }

interface JWT {
        id: string;
        name?: string;
        phone?: string;
        isAdmin: boolean;
    }
}
