import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Tasks from "@/app/components/dashboard/Tasks";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (

        <Tasks session={session} />

    );
}
