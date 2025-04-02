'use client'

import { useReducer, useState, useRef, LegacyRef, Usable } from "react";
import { exerciseData, exercisesAction, workout, workoutAction } from "../lib/definitions";
import AddExercise from "./add-exercise";
import ExerciseLoadIntensityForm from "./exercise-load-intensity-form";
import Workout from "./workout";

import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

export default function PlanWorkout({ exerciseLib }: { exerciseLib: Promise<any[] | null> }) {

    const formRef: LegacyRef<HTMLFormElement> = useRef(null);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [showPlanWorkout, setShowPlanWorkout] = useState(false);
    const [exercises, exercisesDispatch] = useReducer(exercisesReducer, []);
    const [workouts, workoutsDispatch] = useReducer(workoutsReducer, []);
    const handlePlanWorkoutClick = () => {
        setShowPlanWorkout(!showPlanWorkout);
    };
    const todaysDate = new Date(Date()).toISOString().slice(0,10);

    const saveWorkout = async (formData: FormData) => {
        console.log(formData);
        let scheduledDate = new Date(String(formData.get('workoutDate')) + 'T00:00:00')
            .toDateString();
        
        workoutsDispatch({
            type: 'add',
            date: scheduledDate,
            name: String(formData.get('workoutName')),
            exercises: exercises,
        })

        let action = { 
            type: 'reset', 
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
        <div>
            <h3>Scheduled Workouts:</h3>
            <section >
            { workouts.length === 0 ? <span>No workouts planned</span> : 
                <ul >
                {
                    workouts?.map((workout: workout, ndx: number) => { 
                        return <li key={ndx}><Workout data={workout} /></li>
                    })
                }
                </ul>
            }      
            </section>          
            <br/>
            <br/>

            <div>
            <Button variant="contained" onClick={handlePlanWorkoutClick} >Plan a workout</Button>
            {showPlanWorkout && <main >
                <form action={saveWorkout} ref={formRef}>
                    <div>
                        <label htmlFor="workoutDate">Date: </label>
                        <input name="workoutDate" type="date" defaultValue={todaysDate} />
                        <br/>
                        <label htmlFor="workoutName">Workout Name: </label>
                        <TextField name="workoutName" type="text" defaultValue="" />
                        <br/>
                        <FormLabel id="metric-radio-buttons">Metric</FormLabel>
                        <RadioGroup
                            aria-labelledby="metric-radio-buttons"
                            defaultValue="lbs"
                            name="metric"
                        >
                            <FormControlLabel value="lbs" control={<Radio />} label="lbs" />
                            <FormControlLabel value="kg" control={<Radio />} label="kg" />
                        </RadioGroup>
                    </div>    
                    {
                        exercises.length === 0 ? <p>No Exercises Added</p> :
                        <ul> {
                        exercises?.map((exerciseObj: exerciseData, ndx: number) => {
                            return <li key={ndx}>
                                {exerciseObj.name} 
                                <button type="button" onClick={() =>{
                                    let exerciseAction = {
                                        type: 'delete',
                                        ...exerciseObj
                                    }

                                    exercisesDispatch(exerciseAction);
                                }}>Remove</button>
                            </li>
                        })
                        } </ul>
                    }
                    
                    <Button type="button" onClick={handleShowAddExercise}>Add Exercise</Button>
                    <Button type="submit" disabled={exercises.length === 0}>Save</Button>

                    {showAddExercise && <AddExercise dispatchExercise={exercisesDispatch} exerciseList={exerciseLib} />}
                    {/* <ExerciseLoadIntensityForm exerciseDispatch={dispatch} /> */}
                </form>
            </main>}
            </div>
        </div>
    )

    function exercisesReducer(exercises: Array<exerciseData>, action: exercisesAction) {
        let { type, ...exerciseData } = action;
        switch (type) {
            case 'add': {
                return [
                    ...exercises,
                    exerciseData
                ]
            }
            case 'delete': {
                return [ 
                    ...exercises.filter(el => el.id !== exerciseData.id)
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