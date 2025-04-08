'use client'

import React, { use, useReducer } from "react";
import { exercise, exerciseData, workout, workoutAction } from "../lib/definitions";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Workout from "./workout";
import { CalendarIcon } from "@mui/x-date-pickers/icons";

export default function ScheduledWorkouts({ workoutsLib, exerciseLib }: { workoutsLib: workout[], exerciseLib: exerciseData[] }) {

    const [workouts, dispatchWorkouts] = useReducer(workoutsReducer, []);

    return (
        <div >
            <Box display="flex" alignItems="center" mb={1}>
                <Box mr={1} display="flex">
                    <CalendarIcon fontSize="medium" />
                </Box>
                <Typography variant="h5">
                    Scheduled Workouts
                </Typography>
            </Box>
            <Paper>
                {workoutsLib?.length === 0 ? <span>No workouts planned</span> :
                    <Stack spacing={2} direction="row" overflow="scroll">
                        {
                            workoutsLib?.map((workout: workout) => {
                                return <article key={workout.id}>
                                    <Workout data={workout} exercises={exerciseLib} />
                                </article>
                            })
                        }
                    </Stack>
                }
            </Paper>
        </div>
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