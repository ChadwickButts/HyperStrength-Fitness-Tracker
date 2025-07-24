import { Box, Container, Grid, Paper } from "@mui/material";
import ExerciseForm from "../ui/exercises/exercise-form";
import { getExercises } from "../lib/api/exercises";

export default async function Exercises() {
    return (
        <Container disableGutters sx={{ p: 1, mt: 1 }}>
            <ExerciseForm />
        </Container>
    )
}