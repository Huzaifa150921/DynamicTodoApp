import Button from '@/app/components/uielements/button/login/LoginButton'
import styles from './login.module.css'
const Login = () => {
    return (
        <>
            <div className={styles.login}>
                <h1 className={styles.login_heading}>Login</h1>
                <h6 className={styles.login_content}>Please login to continue  </h6>
                <Button />
            </div>
        </>
    )
}

export default Login