'use client'

import { useActionState } from "react";
import { signUpUser } from "@/app/lib/actions";

export default function SignUpForm() {

    const [state, signUpAction, isPending] = useActionState(signUpUser, null);

    return (
        <>
            <form action={signUpAction}>
                <input name="email" type="email" placeholder="User@email.com" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            {state?.status === 200 && <p>
                ACCOUNT CREATED
                {state.token}
            </p>}
            {state?.status === 409 && <p>
                Email already exists: {JSON.stringify(state?.userId)}
            </p>}
        </>
    )
}