import { Session, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Query user from database using Google email
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        console.log("dbUser => ", dbUser);
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name || "";
          token.phone = dbUser.phone || "";
          token.isAdmin = dbUser.isAdmin || false;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              password: "123abc!",
              isAdmin: false,
              phone: "123-456-7890",
            }
          })
          console.log("new user created => ", newUser)
          token.id = newUser.id;
          token.name = newUser.name;
          token.phone = newUser.phone;
          token.isAdmin = newUser.isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }: {session: Session, token: JWT}) {
      // Attach the DB user information to the session

      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // You can modify the redirect URL here, or keep the default behavior
      if (url.startsWith(baseUrl)) {
        return baseUrl; // This redirects to the homepage (or root) after signing in
      }
      return url; // This allows the URL to be dynamic if needed
    },
  },
};
