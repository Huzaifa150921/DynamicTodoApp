import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getAuthenticatedUser } from "@/app/lib/GetAuthenticatedUser";


// getting todos 
export async function GET() {
    const { user, error } = await getAuthenticatedUser();
    if (error) return error;

    const tasks = await prisma.task.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
}


// add todos 
export async function POST(req: NextRequest) {
    const { user, error } = await getAuthenticatedUser();
    if (error) return error;

    const body = await req.json();

    const task = await prisma.task.create({
        data: {
            title: body.title,
            userId: user.id,
        },
    });

    return NextResponse.json(task);
}
