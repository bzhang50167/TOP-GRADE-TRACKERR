import { authOptions } from '@/lib/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Not Authorized"}, {status: 400 })
    }

    
    return NextResponse.json({ success: session }, {status: 200 })
}