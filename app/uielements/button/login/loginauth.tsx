"use server";

import { signIn } from "@/app/lib/auth";

export async function loginWithGoogle() {
    await signIn("google");
}
