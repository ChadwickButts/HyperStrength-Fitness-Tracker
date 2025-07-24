'use client'

import { useEffect, Dispatch, useState, use } from 'react';
import { exerciseData, exercisesAction } from '../../lib/definitions';
import { useQuery, gql } from '@apollo/client';

import {
    Box,
    Button, FormControl, IconButton, InputAdornment, InputLabel,
    List, ListItem, ListItemText, OutlinedInput,
    Stack
} from '@mui/material';

import AddCircle from '@mui/icons-material/AddCircle';
import { Exercise } from '@/types';

export default function AddWorkoutExercise({ dispatchExercise }: { dispatchExercise: Dispatch<exercisesAction> }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(Array<exerciseData>());

    const handleAddExercise = (exercise: exerciseData, ndx: number) => {
        let exerciseDataAction: exercisesAction = {
            type: 'add',
            clientId: ndx,
            ...exercise
        }
        dispatchExercise(exerciseDataAction);
    }

    const Get_Exercises = gql`#graphql
        query Get_Exercises {
            exercises {
                exercisename
                exerciseid
            }
        }
    `;
    const { loading, error, data } = useQuery(Get_Exercises);


    useEffect(() => {
        if (!loading) {
            let result: exerciseData[] = data.exercises.filter((exercise: Exercise) => {
                if (searchValue) {
                    return exercise.exercisename.toLowerCase().includes(searchValue.toLowerCase().trim());
                } else {
                    return false;
                }
            })!;

            setSearchResults(result);
        }
    }, [loading, searchValue])


    return <Stack spacing={2}>
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
        <Box overflow="scroll" maxHeight={300}>
        <List dense={true}>
            {searchResults?.map((exer: Exercise, ndx: number) => {
                return <ListItem key={ndx} >
                    <ListItemText>{exer.exercisename}</ListItemText>
                    <IconButton size='small' color='primary' onClick={() => {
                        handleAddExercise(exer as exerciseData, ndx)
                    }} >
                        <AddCircle />
                    </IconButton>
                </ListItem>
            })}
        </List >
        </Box>
    </Stack>
}