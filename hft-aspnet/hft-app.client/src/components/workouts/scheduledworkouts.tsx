
import React, { use, useEffect, useReducer, useState } from "react";
import { Box, Card, CardContent, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import WorkoutCard from "./workout";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import dayjs from "dayjs";
//import PlanWorkout from "./plan-workout";
import { userInfo, workoutAction, exerciseData, workout, workoutExercise } from "../../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useQuery, QueryKey } from "@tanstack/react-query";
import { getExercises, getWorkoutsByUser } from "../../lib/query";

export default function ScheduledWorkouts() {

    const [value, setValue] = useState(0);
    const user_id = useSelector((state: RootState) => state.user.userid);

    /*** workouts query ***/
    const { data: workoutsQuery, isPending }= useQuery({
        queryKey: ['workoutsByUser', user_id],
        queryFn: () => getWorkoutsByUser(user_id)
    });
    /*** workouts query ***/


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    /*** prefetch exercises query ***/
    useQuery({
        queryKey: ['exercises'],
        queryFn: getExercises,
    });
    /*** exercises query ***/

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
                            {/*<PlanWorkout />*/}
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
                            {isPending && <p>Workouts Loading...</p>}
                            {!isPending && <Box display="flex" flexWrap="wrap" gap={1}>
                                {value === 0 &&
                                    workoutsQuery.map((workoutInfo: workout) => {
                                        if (dayjs(workoutInfo.date).isSame(dayjs().format('YYYY-MM-DD')) ||
                                            dayjs(workoutInfo.date).isAfter(dayjs().format('YYYY-MM-DD')))
                                            return <Box key={workoutInfo.workoutid} flexBasis={200} flexGrow={1} maxWidth={215}>
                                                <WorkoutCard wdata={workoutInfo} />
                                            </Box>
                                    })


                                }
                                {value === 1 &&
                                    workoutsQuery.map((workoutInfo: workout) => {
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
    );

   
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
