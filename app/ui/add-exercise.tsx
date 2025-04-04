'use client'

import { useEffect, Dispatch, useState, use } from 'react';
import { exerciseData, exercisesAction } from '../lib/definitions';

import {
    Box,
    Button, FormControl, IconButton, InputAdornment, InputLabel,
    List, ListItem, ListItemText, OutlinedInput,
    Stack
} from '@mui/material';

import AddCircle from '@mui/icons-material/AddCircle';

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
            {searchResults?.map((exer: exerciseData, ndx: number) => {
                return <ListItem key={ndx} >
                    <ListItemText>{exer.name}</ListItemText>
                    <IconButton size='small' color='primary' onClick={() => {
                        handleAddExercise(exer, ndx)
                    }} >
                        <AddCircle />
                    </IconButton>
                </ListItem>
            })}
        </List >
        </Box>
    </Stack>
}