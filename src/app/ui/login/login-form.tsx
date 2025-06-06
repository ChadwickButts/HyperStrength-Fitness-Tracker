'use client'

import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useToken, useUser } from "@/app/custom/hooks";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [state, loginUserAction, isPending] = useActionState(loginUser, null);

    return (
    <div className="content">

        <form action={loginUserAction}>
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                name="email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="user@email.com"
            />
            <input
                name="password"
                type="password"
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
                placeholder="password"
            />
            &nbsp;
            <button type="submit" disabled={!emailValue || !passwordValue || isPending}>
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
            Login successful
        </p>}
        {state?.status === 401 && <p>
            {state.error?.message}
        </p>}
    </div>)
}