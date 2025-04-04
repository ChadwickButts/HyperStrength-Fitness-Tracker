'use client'

import { useReducer, useState, useRef, LegacyRef, Usable } from "react";
import { exerciseData, exercisesAction, workout, workoutAction } from "../lib/definitions";
import AddExercise from "./add-exercise";
import ExerciseLoadIntensityForm from "./exercise-load-intensity-form";
import Workout from "./workout";

import {
    Box, Button, FormControl, Grid, IconButton, InputLabel, List,
    ListItem, ListItemText, ListSubheader, OutlinedInput, Paper, Stack,
    Typography
} from '@mui/material';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function PlanWorkout({ exerciseLib }: { exerciseLib: Promise<any[] | null> }) {

    const formRef: LegacyRef<HTMLFormElement> = useRef(null);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showPlanWorkout, setShowPlanWorkout] = useState(false);
    const [exercises, exercisesDispatch] = useReducer(exercisesReducer, []);
    const [workouts, workoutsDispatch] = useReducer(workoutsReducer, []);

    const handlePlanWorkoutClick = () => {
        setShowPlanWorkout(!showPlanWorkout);
    };

    const todaysDate = new Date(Date()).toISOString().slice(0, 10);

    const saveWorkout = async (formData: FormData) => {
        console.log(formData);
        let scheduledDate: string = formData.get('workoutDate')!.toString();

        workoutsDispatch({
            type: 'add',
            date: scheduledDate,
            name: String(formData.get('workoutName')),
            exercises: exercises,
        })

        let action = {
            type: 'reset',
            clientId: 0,
            ...exercises[0]
        };
        exercisesDispatch(action);

        setShowAddExercise(false);
        formRef.current?.reset();
    }

    const handleShowAddExercise = () => {
        setShowAddExercise(!showAddExercise);
    }

    return (
        <Stack spacing={2}>
            <Box>
                <div>
                    <Button variant={showPlanWorkout ? "outlined" : "contained"} onClick={handlePlanWorkoutClick} >Plan a workout</Button>
                </div>
            </Box>
            {showPlanWorkout && <Grid container spacing={1}>
                <Grid size={6} >
                    <Paper sx={{ p: 2 }} >
                        <Grid container spacing={1}>
                            <Grid size={6}>
                                <form action={saveWorkout} ref={formRef}>
                                    <FormControl size="small" >
                                        <DatePicker
                                            name="workoutDate"
                                            label="Date"
                                            defaultValue={dayjs(todaysDate)}
                                            slotProps={{
                                                textField: {
                                                    variant: 'standard'
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <br />
                                    <br />
                                    <FormControl>
                                        <InputLabel htmlFor="workoutName">Workout Name</InputLabel>
                                        <OutlinedInput label="Workout Name" name="workoutName" type="text" size="small" defaultValue={'Workout'} />
                                    </FormControl>


                                    <Box component="div" sx={{ py: 2 }}>
                                        <Stack spacing={2} direction="row">
                                            <Button type="button" variant={showAddExercise ? 'outlined' : 'contained'} onClick={handleShowAddExercise}>Add Exercise</Button>
                                            <Button type="submit" variant="contained" disabled={exercises.length === 0}>Save</Button>
                                        </Stack>
                                    </Box>
                                </form>

                                {showAddExercise && <AddExercise dispatchExercise={exercisesDispatch} exerciseList={exerciseLib} />}
                            </Grid>
                            <Grid size={6}>
                                {
                                    exercises.length === 0 ?
                                        <Typography variant="body2" sx={{ p: 2 }}>
                                            No Exercises Added
                                        </Typography>
                                        :
                                        <Box overflow="scroll" maxHeight={525}>
                                        <List dense={true}
                                            subheader={
                                                <ListSubheader component="div" id="workout-exercise-list">
                                                    Exercises
                                                </ListSubheader>
                                            }> {
                                                exercises?.map((exerciseObj: exerciseData, ndx: number) => {
                                                    return <ListItem key={ndx}>
                                                        <ListItemText>{exerciseObj.name}</ListItemText>
                                                        <IconButton size="small" color="error" onClick={() => {
                                                            let exerciseAction = {
                                                                type: 'delete',
                                                                ...exerciseObj,
                                                                clientId: ndx
                                                            }

                                                            exercisesDispatch(exerciseAction);
                                                        }}>
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </ListItem>
                                                })
                                            }
                                        </List>
                                        </Box>
                                }
                            </Grid>
                            {/* <ExerciseLoadIntensityForm exerciseDispatch={dispatch} /> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            }

            <Box>
                <div >
                    <h3>Scheduled Workouts:</h3>
                    {workouts.length === 0 ? <span>No workouts planned</span> :
                        <Stack spacing={2} direction="row" overflow="scroll">
                            {
                                workouts?.map((workout: workout, ndx: number) => {
                                    return <article key={ndx}><Workout data={workout} /></article>
                                })
                            }
                        </Stack>
                    }
                </div>
            </Box>
        </Stack>
    )

    function exercisesReducer(exercises: Array<exerciseData>, action: exercisesAction) {
        let { type, clientId, ...exerciseData } = action;
        switch (type) {
            case 'add': {
                return [
                    ...exercises,
                    exerciseData
                ]
            }
            case 'delete': {
                return [
                    ...exercises.filter((el, ndx) => ndx !== clientId)
                ]
            }
            case 'reset': {
                return []
            }
            default: {
                throw Error('Unknown action type: ' + type);
            }
        }
    }

    function workoutsReducer(workouts: Array<workout>, action: workoutAction) {
        let { type, ...workoutData } = action;
        switch (action.type) {
            case 'add': {
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