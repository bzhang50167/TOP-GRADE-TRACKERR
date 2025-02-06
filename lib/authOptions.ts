import { NextAuthOptions } from "next-auth";
import prisma from "./prisma";

import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const res = await fetch("/your/endpoint", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     const user = await res.json();

    //     // If no error and we have user data, return it
    //     if (
    //       res.ok &&
    //       credentials &&
    //       (await bcrypt.compare(credentials.password, user.password))
    //     ) {
    //       return user;
    //     }
    //     // Return null if user data could not be retrieved
    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Query user from database using Google email
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        console.log("dbUser => ", dbUser);
        // console.log("hitting jwt callback")
        // console.log(dbUser)
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.phone = dbUser.phone;
          token.isAdmin = dbUser.isAdmin;
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
          token.aid = newUser.id;
          token.name = newUser.name;
          token.phone = newUser.phone;
          token.isAdmin = newUser.isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the DB user information to the session
      if (session.user) {
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
