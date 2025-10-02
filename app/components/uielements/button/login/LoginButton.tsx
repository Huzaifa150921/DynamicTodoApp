"use client";

import { loginWithGoogle } from "@/app/components/uielements/button/login/loginauth";
import Style from "./login.module.css";

export default function LoginButton() {
    return (
        <form action={loginWithGoogle}>
            <button type="submit" className={Style.login_button}>
                Login with Google
            </button>
        </form>
    );
}
