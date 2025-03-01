'use client'

import { useReducer, useState } from "react";
import { exercise, exerciseData, exercisesAction } from "../lib/definitions";
import AddExercise from "./add-exercise";
import ExerciseLoadIntensityForm from "./exercise-load-intensity-form";

export default function PlanWorkout() {

    const [showPlanWorkout, setShowPlanWorkout] = useState(false);
    const [exercises, dispatch] = useReducer(exercisesReducer, [])
    const handlePlanWorkoutClick = () => {
        setShowPlanWorkout(!showPlanWorkout);
    }

    const saveWorkout = async (formData: FormData) => {
        const workoutObj = {
            workoutName: formData.get('workoutName'),
            exercises: exercises,
        }

        console.log(workoutObj);
    }

    return (
        <div>
            <button onClick={handlePlanWorkoutClick} >Plan a workout</button>

            {showPlanWorkout && <main >
                <form action={saveWorkout}>
                    <label htmlFor="workoutName">Workout Name: </label>
                    <input name="workoutName" type="text" defaultValue="" />
                    <label id="metric">Metric: </label>
                    <input id="lbs" name="metric" type="radio" value="lbs" />
                    <label htmlFor="lbs">lbs</label>
                    <input id="kg" name="metric" type="radio" value="kg" />
                    <label htmlFor="kg">kg</label>
                    <br />
                    <br />
                    {
                        exercises?.map((exerciseObj: exerciseData, ndx: number) => {
                            return <div key={ndx} >{exerciseObj.name}</div>
                        })
                    }
                    <AddExercise dispatchExercise={dispatch}/>
                    {/* <ExerciseLoadIntensityForm exerciseDispatch={dispatch} /> */}
                    <button type="submit">Save</button>
                </form>
            </main>}
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
            default: {
                throw Error('Unknown action type' + type);
            }
        }
    }
}