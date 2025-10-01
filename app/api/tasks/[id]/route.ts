import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getAuthenticatedUser } from "@/app/lib/GetAuthenticatedUser";

type Params = { params: { id: string } };

// delete todos 
export async function DELETE(req: NextRequest, context: Params) {
    const { id: taskId } = context.params;

    const { user, error } = await getAuthenticatedUser();
    if (error) return error;

    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (!task || task.userId !== user.id) {
        return NextResponse.json(
            { error: "Task not found or unauthorized" },
            { status: 404 }
        );
    }

    await prisma.task.delete({
        where: { id: taskId },
    });

    return NextResponse.json(task);
}

// update todos
export async function PUT(req: NextRequest, context: Params) {
    const { id: taskId } = context.params;

    const { user, error } = await getAuthenticatedUser();
    if (error) return error;

    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (!task || task.userId !== user.id) {
        return NextResponse.json(
            { error: "Task not found or unauthorized" },
            { status: 404 }
        );
    }

    const body = await req.json();

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            title: body.title ?? task.title,
            completed: body.completed ?? task.completed,
        },
    });

    return NextResponse.json(updatedTask);
}
