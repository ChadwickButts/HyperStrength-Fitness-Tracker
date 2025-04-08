import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import { scan } from "react-scan";
import { Card, CardContent, Container, Paper, Stack } from "@mui/material";
import { Suspense } from "react";

import { createClientAll } from '@/utils/supabase/server'
import { getExercises, getWorkouts } from "@/utils/supabase/queries";
import PlanWorkout from "./ui/plan-workout";
import ScheduledWorkouts from "./ui/scheduled-workouts";
import { exerciseData, workout } from "./lib/definitions";

if (typeof window !== 'undefined') {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}


export default async function App() {

  const supabase = createClientAll();
  const [ exercisesLibrary, scheduledWorkoutsLibrary ] = await Promise.all([
    getExercises(supabase),
    getWorkouts(supabase)
  ]);

  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Paper>
          <Card sx={{ p: 2 }}>
            <CardContent>
              This site is a companion for the book, Science of Strength Training:
              Understand the Anatomy and Physiology to Change Your Life
            </CardContent>
          </Card>
        </Paper>
        <ScheduledWorkouts workoutsLib={scheduledWorkoutsLibrary || [] } exerciseLib={exercisesLibrary || []} />
        <Suspense fallback={<div>Loading...</div>}>
          <PlanWorkout exerciseLib={exercisesLibrary} />
        </Suspense>
      </Stack>
    </Container>

  )
}

// Amplify.configure(outputs);
// const client = generateClient<Schema>();

// export default function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   function listTodos() {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }

//   useEffect(() => {
//     listTodos();
//   }, []);

//   function createTodo() {
//     client.models.Todo.create({
//       content: window.prompt("Todo content"),
//     });
//   }

//   return (
//     <main>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
//           Review next steps of this tutorial.
//         </a>
//       </div>
//     </main>
//   );
// }
