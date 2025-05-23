'use client'

import { useState } from "react";
import { addExercise } from "../../lib/actions";
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { exerciseData } from "@/app/lib/definitions";

export default function ExerciseForm({ exerciseLib }: { exerciseLib: exerciseData[] }) {

    const [showForm, setShowForm] = useState(false);

    const handleAddExerciseClick = () => {
        setShowForm(!showForm);
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
        { field: 'exerciseid', headerName: 'Id' }
    ]

    function getRowId(row: exerciseData) {
        return row.exerciseid
    }

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
                <DataGrid rows={exerciseLib} columns={columns} getRowId={getRowId} />
            </Box>
        </Box>
    )
}