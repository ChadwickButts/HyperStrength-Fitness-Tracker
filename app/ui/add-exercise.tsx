'use client'

import { useEffect, Dispatch, useState, use } from 'react';
import { exerciseData, exercisesAction } from '../lib/definitions';

import { Button, FormControl, InputAdornment, InputLabel,
    List, ListItem, ListItemText, OutlinedInput 
    } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

export default function AddExercise({ dispatchExercise, exerciseList }: { dispatchExercise: Dispatch<exercisesAction>, exerciseList: Promise<any[] | null> }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<typeof exerciseLibrary>([]);

    const exerciseLibrary: exerciseData[] | null = use(exerciseList);

    const handleAddExercise = (exercise: exerciseData, ndx: number) => {
        let exerciseDataAction = {
            type: 'add',
            clientId: ndx,
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
        <div>
            <FormControl variant='outlined' size='small' fullWidth>
                <InputLabel htmlFor="exercises-search">Search Exercises</InputLabel>
                <OutlinedInput
                    id="exercises-search"
                    label="Search Exercises"
                    onChange={event => setSearchValue(event.target.value)}
                    value={searchValue}
                    endAdornment={
                        <InputAdornment position="end">
                            <Button type='button' variant='text' onClick={() => {
                                setSearchValue('');
                            }}>Clear</Button>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
        <List dense={true}>
            {searchResults?.map((exer: exerciseData, ndx: number) => {
                return <ListItem key={ndx} >
                    <ListItemText>{exer.name}</ListItemText>
                    <Button variant="contained" size='small' onClick={() => {
                        handleAddExercise(exer, ndx)
                    }} endIcon={<AddIcon />}>
                        Add
                    </Button>
                </ListItem>
            })}
        </List >
    </>

}