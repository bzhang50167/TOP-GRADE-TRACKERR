import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extending the JWT type to include custom fields
declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string | null;
    phone: string | null;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string | null;
      phone: string | null;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
        id: number;
        name: string | null;
        phone: string | null;
        isAdmin: boolean;
    }
}
