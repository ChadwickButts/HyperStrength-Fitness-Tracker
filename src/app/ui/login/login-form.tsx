'use client'

import { useActionState, useState } from "react";
import { loginUser } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [state, loginUserAction, error] = useActionState(loginUser, null);

    return (
    <div className="content">
        <form action={loginUserAction}>
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="user@email.com"
            />
            <input
                type="password"
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
                placeholder="password"
            />
            &nbsp;
            <button disabled={!emailValue || !passwordValue} type="submit">
                Log In
            </button>
            &nbsp;
            <button type="button">
                Forgot Password
            </button>
            &nbsp;
            <button onClick={() => redirect('/signup')}>Sign Up</button>
        </form>
        {state?.status === 200 && <p>
            Login successful {state.token}
        </p>}
        {state?.status === 401 && <p>
            {state.error?.message}
        </p>}
    </div>)
}