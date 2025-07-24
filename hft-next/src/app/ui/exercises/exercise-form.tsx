'use client'

import { useState } from "react";
import { addExercise } from "../../lib/actions";
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { exerciseData } from "@/app/lib/definitions";
import { gql, useQuery } from "@apollo/client";

export default function ExerciseForm() {

    const [showForm, setShowForm] = useState(false);

    const handleAddExerciseClick = () => {
        setShowForm(!showForm);
    }

    const Get_Exercise_Details = gql`#graphql
            query Get_Exercise_Details {
                exercises {
                    exercisename
                    force
                    level
                    mechanic
                    equipment
                    category
                    exerciseid
                }
            }
        `;

    const { loading, error, data } = useQuery(Get_Exercise_Details);

    function getRowId(row: exerciseData) {
        return row.exerciseid;
    }


    const columns: GridColDef[] = [
        { field: 'exercisename', headerName: 'Name' },
        { field: 'force', headerName: 'Force' },
        { field: 'level', headerName: 'Level' },
        { field: 'mechanic', headerName: 'Mechanic' },
        { field: 'equipment', headerName: 'Equipment' },
        { field: 'primaryMuscles', headerName: 'Primary Muscle Group' },
        { field: 'secondaryMuscles', headerName: 'Secondary Muscle Group' },
        { field: 'instructions', headerName: 'Instructions' },
        { field: 'category', headerName: 'Category' },
        { field: 'images', headerName: 'Images' },
        { field: 'exerciseid', headerName: 'id' }
    ]

    return (
        <Box >
            <Box display="flex" mb={1} >
                <Button variant="contained" color="primary" >Add an exercise</Button>
            </Box>

            {showForm &&
                <Grid container spacing={1}>
                    <Grid size={6}>
                        <Card>
                            <CardContent>
                                <form action={addExercise}>
                                    <Stack spacing={2}>
                                        <FormControl>
                                            <InputLabel htmlFor="exercise-name">Exercise Name</InputLabel>
                                            <OutlinedInput label="Exercise Name" name="exercise-name" type="text" size="small" />
                                        </FormControl>
                                        <Button type="submit" variant="outlined" >Add</Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {loading && <p>Exercises Loading...</p>}
                {!loading && <DataGrid rows={data.exercises} columns={columns} getRowId={getRowId}/>}
            </Box>
        </Box>
    )
}