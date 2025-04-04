import Link from "next/link"
import ExerciseForm from "../ui/exercise-form"
import PlanWorkout from "../ui/plan-workout"
import { getExercises } from "../lib/api/exercises"
import { Suspense } from "react";
import { Card, CardContent, Container, Paper, Stack } from "@mui/material";

export default async function Page() {

    const exercisesLibrary = getExercises();

    return (
        <Container>
            <nav>
                <br/>
                {/* <ExerciseForm /> */}
                {/* <button>Add an exercise</button>
                <br/>
                <button>Record a PR (Personal Record)</button>
                <br/>
                <button>Workout History</button> */}
            </nav>
            <main>
                <Stack spacing={2}>
                <Paper>
                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            This site is devoted to the book, Science of Strength Training: 
                            Understand the Anatomy and Physiology to Change Your Life
                        </CardContent>
                    </Card>
                </Paper>
                <Suspense fallback={<div>Loading...</div>}>
                    <PlanWorkout exerciseLib={exercisesLibrary} />
                </Suspense>
                {/* <section>Progress</section>
                <section>Workout Schedule</section>
                <section>Best Lift This Week</section>
                <section>Last PR</section> */}
                </Stack>
            </main>
        </Container> 
    )
}