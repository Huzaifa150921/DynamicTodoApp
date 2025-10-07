import styles from './calanderview.module.css'
import CalanderFeatures from '../../components/todocalander/calanderfeatures/CalanderFeatures'
import { auth } from '@/app/lib/Auth'
import { redirect } from 'next/navigation'
const CalanderView = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }
    return (
        <>
            <div className={styles.calanderview}>
                <CalanderFeatures />
            </div>
        </>
    )
}

export default CalanderView