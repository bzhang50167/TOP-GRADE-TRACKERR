import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function authMiddleware(req: NextRequest) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    // Pass the cookies to getSession
    // const session = await getSession({ req: mockReq });
//   const session = await getSession({ req });

  if (!session) {
    // Redirect to the homepage if no session is found
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Proceed with the request if the user is authenticated
}

export const config = {
  matcher: ["/jobs", "/findings", "/recommendations"],  // List paths you want to protect
};
