'use client'

import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/app/lib/actions";
import { useToken, useUser } from "@/app/custom/hooks";
import { Button, FormControl, Grid, InputLabel, Link, OutlinedInput } from "@mui/material";
import { useRouter } from "next/navigation";


export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [state, loginUserAction, isPending] = useActionState(loginUser, null);
    
    const router = useRouter();

    return (
        <div className="content">

            <form action={loginUserAction}>
                <Grid container>
                    <Grid size={8} container spacing={1}>
                        <Grid size={12}>
                            <h1>Log In</h1>
                            {errorMessage && <div className="fail">{errorMessage}</div>}
                        </Grid>
                        <Grid size={6} container spacing={1}>
                            <FormControl size="small" fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput label="Email" name="email" type="text" size="small" value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    placeholder="user@email.com" />
                            </FormControl>                        
                            <FormControl size="small" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput label="Password" name="password" type="text" size="small" value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    placeholder="password" />
                            </FormControl>
                            <Grid size={12}>
                                <Link href="#" underline="hover">
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid size={12} my={1}>
                            <Button variant="contained" type="submit" disabled={!emailValue || !passwordValue || isPending}>
                                Log In
                            </Button>
                        </Grid>
                        <Grid my={2} size={12}>
                            <p>
                                Don't have an account? &nbsp;
                                <Link component="button" underline="hover" 
                                    onClick={() => router.push('/signup')}>
                                    Sign Up
                                </Link>
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            {state?.status === 200 && <p>
                Login successful
            </p>}
            {state?.status === 401 && <p>
                {state.error?.message}
            </p>}
        </div>)
}