'use client'

import React, { use, useReducer, useState } from "react";
import { exercise, exerciseData, workout, workoutAction } from "../lib/definitions";
import { Box, Card, CardContent, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import Workout from "./workout";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import dayjs from "dayjs";

export default function ScheduledWorkouts({ workoutsLib, exerciseLib }: { workoutsLib: workout[], exerciseLib: exerciseData[] }) {

    const [workouts, dispatchWorkouts] = useReducer(workoutsReducer, []);
    const [value, setValue] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid size={12} >
                <Card >
                    <CardContent >
                        <Box display="flex" alignItems="center" mb={1} >
                            <Box mr={1} >
                                <CalendarIcon fontSize="medium" />
                            </Box>
                            <Typography variant="h1">
                                Scheduled Workouts
                            </Typography>
                        </Box>
                        <Box >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                                <Tabs value={value} onChange={handleTabChange} aria-label="workout tabs">
                                    <Tab disableRipple label="Upcoming" id="simple-tab-index-0" aria-controls="simple-tabpanel-0" />
                                    <Tab disableRipple label="Past" id="simple-tab-index-1" aria-controls="simple-tabpanel-1" />
                                </Tabs>
                            </Box>
                            <Box>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {value === 0 &&
                                        workoutsLib?.map((workout: workout) => {
                                            if (dayjs(workout.date).isSame(dayjs().format('YYYY-MM-DD')) ||
                                                dayjs(workout.date).isAfter(dayjs().format('YYYY-MM-DD')))
                                                return <Box key={workout.id} flexBasis={200} flexGrow={1} maxWidth={215}>
                                                    <Workout data={workout} exercises={exerciseLib} />
                                                </Box>
                                        })


                                    }
                                    {value === 1 &&
                                        workoutsLib?.map((workout: workout) => {
                                            if (dayjs(workout.date).isBefore(dayjs().format('YYYY-MM-DD')))
                                                return <Box key={workout.id} flexBasis={200} flexGrow={1} maxWidth={215}>
                                                    <Workout data={workout} exercises={exerciseLib} />
                                                </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
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