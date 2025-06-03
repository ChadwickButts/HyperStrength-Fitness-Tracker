import { Box, Grid, Paper } from "@mui/material";
import SignUpForm from "../ui/signup/signup-form";

export default async function SignUp() {
    return (
        <Grid container>
            <Grid size={12} >
                <Paper sx={{ p: 2 }} >
                    <Box>
                        <SignUpForm />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}