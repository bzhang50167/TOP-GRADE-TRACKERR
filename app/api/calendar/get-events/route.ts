import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return {message: "hitting get"}
}
