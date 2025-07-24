import React from 'react';
import { Container, Grid } from "@mui/material";
import Welcome from "./Welcome";


export default function Dashboard() {
    return (
        <Container disableGutters sx={{ p: 1, mt: 1 }}>
            <Grid container spacing={1} >
                <Grid size={{ sm: 12, md: 8 }}>

                </Grid>
                <Grid size={{ sm: 12, md: 4 }}>
                    <Welcome />
                </Grid>
            </Grid>
        </Container>
    )
}