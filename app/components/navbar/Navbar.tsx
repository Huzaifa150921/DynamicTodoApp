import React from 'react'
import styles from './navbar.module.css'
import { auth } from '@/app/lib/auth'
import { LogoutButton } from '@/app/uielements/button/logout/LogoutButton'
const Navbar = async () => {
    const session = await auth();
    return (
        <>
            <div className={styles.navbar}>
                <h1 className={styles.navbar_heading}>Todo App</h1>
                {session?.user ? (<LogoutButton />) : null}
            </div>
        </>
    )
}

export default Navbar