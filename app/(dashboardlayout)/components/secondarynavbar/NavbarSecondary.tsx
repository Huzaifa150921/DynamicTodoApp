'use client'
import { useState } from 'react';
import styles from './navbarsecondary.module.css'
import { useRouter } from 'next/navigation'
import CreateTaskDialog from '@/app/(dashboardlayout)/components/createtaskdialog/CreateTaskDialog';
const NavbarSecondary = () => {

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const router = useRouter();

    function navigateToListView() {
        router.push("./listview")
    }

    function navigateToCalanderView() {
        router.push("./calanderview")
    }

    function navigateToDashboard() {
        router.push("./dashboard")
    }


    return (
        <>
            <div className={styles.navbarsecondary}>
                <div className={styles.navbarsecondary_btnflexprimary}>
                    <button onClick={navigateToListView} className={styles.navbarsecondary_listbtn}>List View</button>
                    <button onClick={navigateToCalanderView} className={styles.navbarsecondary_calanderbtn}>Calander View</button>
                </div>
                <div className={styles.navbarsecondary_btnflexsecondary}>
                    <button onClick={navigateToDashboard} className={styles.navbarsecondary_dashboardbtn}>Dashboard</button>
                    <button className={styles.navbarsecondary_addbtn} onClick={() => setShowDialog(prev => !prev)}>Add Task</button>
                </div>
            </div>

            <CreateTaskDialog showDialog={showDialog} setShowDialog={setShowDialog} />

        </>
    )
}

export default NavbarSecondary