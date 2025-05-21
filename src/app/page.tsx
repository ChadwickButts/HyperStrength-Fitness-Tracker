
import { scan } from "react-scan";
import { Container,Grid } from "@mui/material";


import { createClientAll } from '../utils/supabase/server'
import { getExercises, getWorkouts } from "../utils/supabase/queries";
import ScheduledWorkouts from "./ui/scheduled-workouts";
import Welcome from "./ui/welcome";

// if (typeof window !== 'undefined') {
//   scan({
//     enabled: true,
//     log: true, // logs render info to console (default: false)
//   });
// }

export default async function App() {

  const supabase = await createClientAll();
  const [exercisesLibrary, scheduledWorkoutsLibrary] = await Promise.all([
    getExercises(supabase),
    getWorkouts(supabase)
  ]);

  return (
      <Container disableGutters sx={{ p: 1, mt: 1 }}>
        <Grid container spacing={1} >
          <Grid size={{ sm: 12, md: 8 }}>
            <ScheduledWorkouts workoutsLib={scheduledWorkoutsLibrary || []} exerciseLib={exercisesLibrary || []} />
          </Grid>
          <Grid size={{ sm: 12, md: 4 }}>
            <Welcome />
          </Grid>
        </Grid>
      </Container>

  )
}