import { Session, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/calendar", // Specify required scopes here
          // access_type: "offline", // Request offline access for a refresh token
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        if (user) {
          // Query user from database using Google email
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.name || "";
            token.phone = dbUser.phone || "";
            token.isAdmin = dbUser.isAdmin || false;
          } else {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                isAdmin: false,
                phone: "123-456-7890",
              }
            })

            token.id = newUser.id;
            token.name = newUser.name;
            token.isAdmin = newUser.isAdmin;
          }
        }
      }

      console.log('token at the end of jwt callback', token)
      return token;
    },
    async session({ session, token }) {
      console.log('token in session callback', token)
      // Attach the DB user information to the session
      // console.log("Token in session callback ===> ", token)

      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.isAdmin = token.isAdmin;
      }
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      // console.log("Session at the end of session callback ===>", session)

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
