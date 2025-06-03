import { Box, Grid, Input, Paper } from "@mui/material";
import LoginForm from "../ui/login/login-form";

export default async function Login() {
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