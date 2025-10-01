import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { auth } from "./auth";

export async function getAuthenticatedUser() {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
    }

    return { user };
}
