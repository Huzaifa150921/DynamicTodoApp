import { auth } from "@/app/lib/Auth";
import { redirect } from "next/navigation";
import styles from "./dashboardpage.module.css";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <div className={styles.dashboardpage}>
            <h1 className={styles.dashboardpage_heading}>
                Welcome, {session?.user?.name}!
            </h1>

            <p className={styles.dashboardpage_text}>
                This is your personal dashboard where you can manage your tasks efficiently.
                Keep track of your to-do items, mark tasks as completed, and stay organized
                throughout your day. Explore the tasks and see what's next on your agenda!
            </p>

        </div>
    );
}
