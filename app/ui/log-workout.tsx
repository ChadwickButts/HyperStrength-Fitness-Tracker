'use client'

import { useState } from "react";
import ExerciseForm from "./exercise-form";

export default function LogWorkout() {

    const [showLogWorkout, setShowLogWorkout] = useState(false);

    const handleLogWorkoutClick = () => {
        setShowLogWorkout(!showLogWorkout);
    }

    const addWorkout = async (formData: FormData) => { console.log(formData) };

    return (
        <div>
            <button onClick={handleLogWorkoutClick} >Log a workout</button>

            {showLogWorkout && <main >
                <form action={addWorkout}>
                    <ExerciseForm />
                    <label htmlFor="exercise-name">Exercise:</label>
                    <input name="exercise-name" type="text"></input>
                    <br />
                    <label htmlFor="sets">Sets:</label>
                    <input name="sets" type="number" defaultValue={3}></input>
                    <br />
                    <label htmlFor="reps">Reps:</label>
                    <input name="reps" type="number" defaultValue={10}></input>
                    <br />
                    <button type="submit">Add</button>
                </form>
            </main>}
        </div>
    )
}