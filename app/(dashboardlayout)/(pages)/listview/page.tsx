import TodoList from '@/app/(dashboardlayout)/components/todolist/TodoList'
import { auth } from "@/app/lib/Auth";
import { redirect } from "next/navigation";
import styles from './listview.module.css'
const ListView = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }
    return (
        <div className={styles.listview}>
            <TodoList />
        </div>
    );
}

export default ListView