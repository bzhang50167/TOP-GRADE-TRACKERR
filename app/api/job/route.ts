import { RequestBody } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
prisma = require("@/lib/prisma");

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { description, address, clientName, clientEmail, clientPhone, userId, scheduledDate, warrenty } = req.body as unknown as RequestBody;

        const parsedScheduledDate = new Date(scheduledDate);

        const job = await prisma.job.create({
            data: {
                description,
                clientEmail,
                clientName,
                clientPhone,
                address,
                userId,
                warrenty,
                scheduledDate: parsedScheduledDate
            },
        });

        return new Response(JSON.stringify(job), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response('Error creating job', { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const jobs = await prisma.job.findMany();
        return new Response(JSON.stringify(jobs), { status: 201 })
    } catch (error) {
        console.error(error);
        return new Response('Error fetching jobs', { status: 500 })
    }
}
