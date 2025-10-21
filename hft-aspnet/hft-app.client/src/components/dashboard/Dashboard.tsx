import React from 'react';
import { Container, Grid } from "@mui/material";
import Welcome from "./Welcome";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ScheduledWorkouts from '../workouts/scheduledworkouts';


export default function Dashboard() {

    const activeTab = useSelector((state: RootState) => state.activeTab);

    return (
        <Container disableGutters sx={{ p: 1, mt: 1 }}>
            <Grid container spacing={1} >
                <Grid size={{ sm: 12, md: 8 }}>
                    { activeTab == 'dashboard' && <ScheduledWorkouts /> }
                </Grid>
                <Grid size={{ sm: 12, md: 4 }}>
                    <Welcome />
                </Grid>
            </Grid>
        </Container>
    )
}