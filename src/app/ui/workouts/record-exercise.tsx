'use client'

import { ChangeEvent, useState } from "react";

export default function RecordExerciseForm(props: { exerciseDispatch: any }) {

    const [exercise, setExercise] = useState({
        exerciseName: '',
        sets: 3,
        reps: 10,
        weight: 135,
        metric: 'lbs',
        tempo: 'Controlled'
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setExercise({
            ...exercise,
            [name]: value
        })
    }


    const handleAddExercise = () => {
        props.exerciseDispatch({
            type: 'add',
            exerciseName: exercise.exerciseName,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            metric: exercise.metric,
            tempo: exercise.tempo
        })
        console.log(exercise);
    }

    return (
        <>
            <label htmlFor="exerciseName">Exercise:</label>
            <input name="exerciseName" type="text" value={exercise.exerciseName} onChange={handleInputChange}></input>
            <br />
            <label htmlFor="sets">Sets:</label>
            <input name="sets" type="number" value={exercise.sets} onChange={handleInputChange}></input>

            <label htmlFor="reps">Reps:</label>
            <input name="reps" type="number" value={exercise.reps} onChange={handleInputChange}></input>
            <br />
            <label htmlFor="weight">Weight:</label>
            <input name="weight" type="number" value={exercise.weight} onChange={handleInputChange}></input>
            <br />
            <label htmlFor="tempo">tempo:</label>
            <input name="tempo" type="text" value={exercise.tempo} onChange={handleInputChange}></input>
            <br />
            <button type="button" onClick={handleAddExercise}>Add</button>
        </>
    )
}