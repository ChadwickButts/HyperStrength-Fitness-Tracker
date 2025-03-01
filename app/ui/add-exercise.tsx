import { ChangeEvent, Dispatch, MouseEventHandler, useState } from 'react';
import { exercises } from '../lib/placeholder-data';
import { exerciseData, exercisesAction } from '../lib/definitions';

export default function AddExercise(props : { dispatchExercise: Dispatch<exercisesAction> } ) {

    const [showAddExercise, setShowAddExercise] = useState(false);
    const [searchResults, setSearchResults] = useState<typeof exercises>([]);

    
    const handleShowAddExercise = () => {
        setShowAddExercise(!showAddExercise);
    }
    
    const handleAddExercise = (exercise: exerciseData) => {
        let exerciseDataAction = {
            type: 'add',
            ...exercise
        }
        props.dispatchExercise(exerciseDataAction)
        console.log(exercise);
    }
    
    const searchForExercise = (event: ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        let result : typeof exercises = exercises.filter(exercise => {
            if (value) {
                return exercise.name.toLowerCase().includes(value.toLowerCase());
            } else {
                return false;
            }
        });

        setSearchResults(result);
    }

    return <>
        <button type="button" onClick={handleShowAddExercise}>Add Exercise</button>
        { showAddExercise && <div>
            <input id="exercises-search" type='text' onChange={searchForExercise} />
            <ul>
                { searchResults.map( (exer, ndx) => {
                    return <div key={ndx}>
                        <span>{exer.name}</span>
                        <button type='button' onClick={() => {
                            handleAddExercise(exer)
                        }}>Add</button>
                    </div>
                })}
            </ul>
        </div> }
    </>
    
}