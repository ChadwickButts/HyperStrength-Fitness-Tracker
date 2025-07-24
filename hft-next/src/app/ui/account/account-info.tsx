'use client'

import { Button } from "@mui/material"
import { useRouter } from "next/navigation";

export function AccountInfo() {
    const router = useRouter();

    return (
        <>
            <p>Welcome, logged in user</p>
            <Button type="button" variant="contained" onClick={() => { router.push('/signout') }}>Sign Out</Button>
        </>
    )
}