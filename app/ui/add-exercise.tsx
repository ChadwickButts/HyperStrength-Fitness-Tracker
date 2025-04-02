'use client'

import { useEffect, Dispatch, useState, use, Usable } from 'react';
import { exerciseData, exercisesAction } from '../lib/definitions';

export default function AddExercise({ dispatchExercise, exerciseList } : { dispatchExercise: Dispatch<exercisesAction> , exerciseList: Promise<any[] | null> }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<typeof exerciseLibrary>([]);

    const exerciseLibrary: exerciseData[] | null = use(exerciseList);

    const handleAddExercise = (exercise: exerciseData) => {
        let exerciseDataAction = {
            type: 'add',
            ...exercise
        }
        dispatchExercise(exerciseDataAction);
    }
    
    useEffect(() => {
        let result: exerciseData[] | null = exerciseLibrary?.filter(exercise => {
            if (searchValue) {
                return exercise.name.toLowerCase().includes(searchValue.toLowerCase());
            } else {
                return false;
            }
        })!;

        setSearchResults(result);
    }, [searchValue])

    return <>
        <p>
            <label htmlFor='exercises-search'>Search Exercises: </label>
            <input id="exercises-search" type='text' onChange={event => setSearchValue(event.target.value)} value={searchValue} />
            <button type='button' onClick={() => {
                setSearchValue('');
            }}>Clear</button>
        </p>
        <ul>
            {searchResults?.map((exer: exerciseData, ndx: number) => {
                return <div key={ndx}>
                    <span>{exer.name}</span>
                    <button type='button' onClick={() => {
                        handleAddExercise(exer)
                    }}>Add</button>
                </div>
            })}
        </ul>
    </>

}