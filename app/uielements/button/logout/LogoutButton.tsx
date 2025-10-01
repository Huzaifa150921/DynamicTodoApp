import { signOut } from "@/app/lib/auth"
import styles from './logout.module.css'
export function LogoutButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className={styles.signout_button} type="submit">Sign Out</button>
        </form>
    )
}