// import { NextRequest, NextResponse } from 'next/server';
// import { authMiddleware } from './middleware/authMiddleware';
// import { NextApiRequest } from 'next';

// export async function middleware(req: NextRequest) {
//     await authMiddleware(req);
//     return NextResponse.next()
// }

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs", "/findings", "/recommendations"],
};
