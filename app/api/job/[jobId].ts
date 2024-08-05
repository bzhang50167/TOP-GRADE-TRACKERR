import { RequestBody } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
prisma = require("@/lib/prisma");

export async function GET(req: NextRequest) {
    try {

        const url = new URL(req.url);
        const jobId = url.pathname.split("/").pop();

        if (!jobId) {
            return NextResponse.json(
                { message: "Please provide a group id" },
                {
                    status: 400,
                    statusText: "Bad Request",
                }
            );
        }

        const job = await prisma.job.findUnique({
            where: {
                id: parseInt(jobId)
            }
        });

        if (!job) {
            return new Response('Can not find job', { status: 500 })
        }

        return new Response(JSON.stringify(job), { status: 201 })
    } catch (error) {
        console.error("Error fetching job:", error);
        return new Response('Error feching job', { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { description, address, clientName, clientEmail, clientPhone, userId, scheduledDate } = req.body as unknown as RequestBody;

        const parsedScheduledDate = new Date(scheduledDate);

        const url = new URL(req.url);
        const jobId = url.pathname.split("/").pop();

        if (!jobId) {
            return NextResponse.json(
                { message: "Please provide a group id" },
                {
                    status: 400,
                    statusText: "Bad Request",
                }
            );
        }

        const job = await prisma.job.findUnique({
            where: {
                id: parseInt(jobId),
            },
        });

        if (!job) {
            return new Response('can not find Job', { status: 500 })
        }

        const updatedJob = await prisma.job.update({
            where: {
                id: parseInt(jobId),
            },
            data: {
                description,
                clientEmail,
                clientName,
                clientPhone,
                address,
                userId,
                scheduledDate: parsedScheduledDate
            },
        });

        return new Response(JSON.stringify(job), { status: 201 })
    } catch (error) {
        console.error("Error updating job:", error);
        return new Response('can not edit job', { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const url = new URL(req.url);
        const jobId = url.pathname.split("/").pop();

        if (!jobId) {
            return NextResponse.json(
                { message: "Please provide a group id" },
                {
                    status: 400,
                    statusText: "Bad Request",
                }
            );
        }

        const job = await prisma.job.findUnique({
            where: {
                id: parseInt(jobId),
            },
        });

        if (!job) {
            return new Response('can not find job', {status:400})
        }

        await prisma.job.delete({
            where: {
                id: parseInt(jobId),
            },
        });

        return new Response('deleted job', {status:201})
    } catch (error) {
        console.error("Error deleting job:", error);
        return new Response('unable to delete job', {status:500})
    }
}
