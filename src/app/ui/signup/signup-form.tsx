'use client'

import { useActionState, useState } from "react";
import { signUpUser } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { Button, FormControl, InputLabel, OutlinedInput, Link, Grid, Paper } from "@mui/material";


export default function SignUpForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");


    const [state, signUpAction, isPending] = useActionState(signUpUser, null);

    return (
        <div className="content">
            <h1>Sign Up</h1>
            <form action={signUpAction}>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <FormControl>
                    <InputLabel htmlFor="email" size="small">Email</InputLabel>
                    <OutlinedInput
                        label="name"
                        name="email"
                        type="email"
                        size="small"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="user@email.com"
                    />

                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password" size="small">Password</InputLabel>
                    <OutlinedInput
                        label="Password"
                        name="password"
                        type="password"
                        size="small"
                        onChange={(e) => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        placeholder="Password"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password" size="small">Confirm Password</InputLabel>
                    <OutlinedInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        size="small"
                        onChange={(e) => setConfirmPasswordValue(e.target.value)}
                        value={confirmPasswordValue}
                        placeholder="Password"
                    />
                </FormControl>
                &nbsp;
                <Button
                    variant="contained"
                    disabled={
                        !emailValue ||
                        !passwordValue ||
                        passwordValue !== confirmPasswordValue
                    }
                    type="submit"
                >
                    Sign Up
                </Button>
                &nbsp;
                <Button variant="outlined" type="button">
                    Forgot Password
                </Button>
                <p>
                    Already have an account? &nbsp;
                    <Link href='/login'>Login</Link>
                </p>



            </form>
            {state?.status === 200 && <p>
                ACCOUNT CREATED
                {state.token}
            </p>}
            {state?.status === 409 && <p>
                Email already exists: {JSON.stringify(state?.userId)}
            </p>}
        </div>
    )
}