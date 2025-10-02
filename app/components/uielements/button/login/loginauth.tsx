"use server";

import { signIn } from "@/app/lib/Auth";

export async function loginWithGoogle() {
    await signIn("google");
}
