import { Box, Grid, Input, Paper } from "@mui/material";
import { cookies } from 'next/headers';
import LoginForm from "../ui/login/login-form";
import { redirect } from "next/navigation";

export default async function Login() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session");

    if (token) {
        redirect('/account');
    }

    return (
        <Grid container>
            <Grid size={12} >
                <Paper sx={{ p: 2 }} >
                    <Box>
                        <LoginForm />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}