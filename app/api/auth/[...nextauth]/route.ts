import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    })
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  // callbacks: {
  //   async jwt({ token, account }): Promise<JWT> {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     (session as any).accessToken = token.accessToken;
  //     return session;
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
