'use client'

import React, { use, useReducer, useState } from "react";
import { exercise, exerciseData, workout, workoutAction } from "../lib/definitions";
import { Box, Card, CardContent, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import WorkoutCard from "./workout";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import dayjs from "dayjs";
import PlanWorkout from "./plan-workout";
import { useQuery, gql } from "@apollo/client";
import { Workout } from "@/types";

export default function ScheduledWorkouts({ exerciseLib }: { exerciseLib: exerciseData[] }) {

    const [workouts, dispatchWorkouts] = useReducer(workoutsReducer, []);
    const [value, setValue] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Get_Workouts = gql`#graphql
            query Get_Workouts {
                workouts {
                    workoutname
                    workoutid
                    date
                    tracked
                }
            }
        `;

    const { loading, error, data } = useQuery(Get_Workouts)

    return (
        <Grid container>
            <Grid size={12} >
                <Paper sx={{ p: 2 }} >
                    <Box display="flex" justifyContent="space-between" mb={1} >
                        <Box display="flex" alignItems="center" >
                            <Box mr={1}>
                                <CalendarIcon fontSize="medium" />
                            </Box>
                            <Typography variant="h1" sx={{
                                fontWeight: 400
                            }}>
                                Scheduled Workouts
                            </Typography>
                        </Box>
                        <Box >
                            <PlanWorkout />
                        </Box>
                    </Box>
                    <Box >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                            <Tabs value={value} onChange={handleTabChange} aria-label="workout tabs">
                                <Tab disableRipple label="Upcoming" id="simple-tab-index-0" aria-controls="simple-tabpanel-0" />
                                <Tab disableRipple label="Past" id="simple-tab-index-1" aria-controls="simple-tabpanel-1" />
                            </Tabs>
                        </Box>
                        <Box>
                            {loading && <p>Workouts Loading...</p>}
                            {!loading && <Box display="flex" flexWrap="wrap" gap={1}>
                                {value === 0 &&
                                    data?.workouts.map((workoutInfo: Workout) => {
                                        if (dayjs(workoutInfo.date).isSame(dayjs().format('YYYY-MM-DD')) ||
                                            dayjs(workoutInfo.date).isAfter(dayjs().format('YYYY-MM-DD')))
                                            return <Box key={workoutInfo.workoutid} flexBasis={200} flexGrow={1} maxWidth={215}>
                                                <WorkoutCard wdata={workoutInfo} />
                                            </Box>
                                    })


                                }
                                {value === 1 &&
                                    data?.workouts.map((workoutInfo: Workout) => {
                                        if (dayjs(workoutInfo.date).isBefore(dayjs().format('YYYY-MM-DD')))
                                            return <Box key={workoutInfo.workoutid} flexBasis={200} flexGrow={1} maxWidth={215}>
                                                <WorkoutCard wdata={workoutInfo} />
                                            </Box>
                                    })
                                }
                            </Box>}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )

    function workoutsReducer(workouts: Array<workout>, action: workoutAction) {
        let { type, ...workoutData } = action;
        console.log(workoutData);
        switch (action.type) {
            case 'add': {
                //addWorkout(workoutData);
                return [
                    ...workouts,
                    workoutData
                ]
            }
            default: {
                throw new Error("Unknown action type: " + action.type)
            }
        }
    }
}