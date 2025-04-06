'use client'

import React, { use, useReducer } from "react";
import { exercise, workout, workoutAction } from "../lib/definitions";
import { Stack } from "@mui/material";
import Workout from "./workout";

export default function ScheduledWorkouts({ workoutsLib, exerciseLib } : { workoutsLib: Promise<any[] | null>, exerciseLib: Promise<any[] | null> }) {

    const workoutsData: workout[] | null = use(workoutsLib);
    const [workouts, dispatchWorkouts] = useReducer(workoutsReducer, []);

    return (
        <div >
            <h3>Scheduled Workouts:</h3>
            {workoutsData?.length === 0 ? <span>No workouts planned</span> :
                <Stack spacing={2} direction="row" overflow="scroll">
                    {
                        workoutsData?.map((workout: workout) => {
                            return <article key={workout.id}>
                                <Workout data={workout} exercises={exerciseLib}/>
                            </article>
                        })
                    }
                </Stack>
            }
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