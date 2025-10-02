import { auth } from "@/app/lib/Auth";
import { redirect } from "next/navigation";
import Tasks from "@/app/components/dashboard/TodoList";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (

        <Tasks session={session} />

    );
}
