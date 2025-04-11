'use client'

import { useState } from "react";
import { addExercise } from "../../lib/actions";

export default function ExerciseForm() {

    const [showForm, setShowForm] = useState(false);

    const handleAddExerciseClick = () => {
        setShowForm(!showForm);
    }

    // const addExercise = async (formData: FormData) => { 
    //     console.log(formData);        
    // };

    return (
        <div>
            <button onClick={handleAddExerciseClick} >Add an exercise</button>

            {showForm && <main >
                <form action={addExercise}>
                    <label htmlFor="exercise-name">Exercise name:</label>
                    <input name="exercise-name" type="text"></input>
                    <button type="submit">Add</button>
                </form>
            </main>}
        </div>
    )
}