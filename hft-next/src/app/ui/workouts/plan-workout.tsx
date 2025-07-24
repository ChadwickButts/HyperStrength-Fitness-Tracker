'use client'

import { useReducer, useState, useRef, LegacyRef, Usable } from "react";
import { exerciseData, exercisesAction, workout, workoutAction } from "../../lib/definitions";
import AddWorkoutExercise from "./add-workout-exercise";
import { gql, useQuery } from "@apollo/client";
import ExerciseLoadIntensityForm from "./record-exercise";
import Workout from "./workout";

import {
    Box, Button, FormControl, Grid, IconButton, InputLabel, List,
    ListItem, ListItemText, ListSubheader, Modal, OutlinedInput, Paper, Stack,
    Typography
} from '@mui/material';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createWorkout } from "../../lib/actions";
import { Close } from "@mui/icons-material";
//import { addWorkout } from "../lib/api/exercises";

export default function PlanWorkout() {

    const formRef: LegacyRef<HTMLFormElement> = useRef(null);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showPlanWorkout, setShowPlanWorkout] = useState(false);
    const [exercises, exercisesDispatch] = useReducer(exercisesReducer, []);

    const handlePlanWorkoutClick = () => {
        setShowPlanWorkout(!showPlanWorkout);
    };

    const todaysDate = new Date(Date()).toISOString().slice(0, 10);

    const saveWorkout = async (formData: FormData) => {
        let scheduledDate: string = formData.get('workoutDate')!.toString();
        createWorkout(formData);

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
        <>
            <Box>
                <Button variant="contained" onClick={handlePlanWorkoutClick} >Plan a workout</Button>
            </Box>
            <Modal
                open={showPlanWorkout}
                onClose={handlePlanWorkoutClick}
                aria-labelledby="modal-plan-workout"
                aria-describedby="plan-workout-form"
            >
                <Box display='grid' height='100%' >
                    <Grid container spacing={1} m='auto' width={600} >
                        <Grid size={12} >
                            <Paper sx={{ p: 2, pt: 0, pr: 0 }} >
                                <Box display='flex' justifyContent="flex-end">
                                    <IconButton onClick={handlePlanWorkoutClick}>
                                        <Close fontSize="small" />
                                    </IconButton>
                                </Box>
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

                                            <input type="hidden" name="exercises" value={exercises.map(exercise => exercise.exerciseid).toString()} />

                                            <Box component="div" sx={{ py: 2 }}>
                                                <Stack spacing={2} direction="row">
                                                    <Button type="button" variant={showAddExercise ? 'outlined' : 'contained'} onClick={handleShowAddExercise}>Add Exercise</Button>
                                                    <Button type="submit" variant="contained" disabled={exercises.length === 0}>Save</Button>
                                                </Stack>
                                            </Box>
                                        </form>

                                        {showAddExercise && <AddWorkoutExercise dispatchExercise={exercisesDispatch} />}
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
                                                                    <ListItemText>{exerciseObj.exercisename}</ListItemText>
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
                </Box>
            </Modal>
        </>
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
}