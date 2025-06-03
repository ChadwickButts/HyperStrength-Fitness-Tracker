'use client'

import { useActionState } from "react";
import { loginUser } from "@/app/lib/actions";

export default function LoginForm() {

    const [state, loginUserAction, error] = useActionState(loginUser, null);

    return ( <>
            <form action={loginUserAction}>
                <input name="email" type="email" placeholder="User@email.com" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            {state?.status === 200 && <p>
                Login successful {state.token}
            </p>}
            {state?.status === 401 && <p>
                {state.error?.message}    
            </p>}
        </>)
}