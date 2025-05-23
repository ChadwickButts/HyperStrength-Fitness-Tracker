import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseClient = createClient(supabaseUrl, supabaseKey);


export async function getExercisesClient() {
    const { data: exercises } = await supabaseClient.from('exercises').select();

    return exercises;
}

export async function getWorkoutsClient() {
    const { data: workouts } = await supabaseClient.from('workouts').select().order('date', {
        ascending: false
    });

    return workouts;
}

// Server component request
export async function getWorkoutExercises() {
    const { data: workout_exercise_details } = await supabaseClient.from('workout_exercise_details').select();    
    return workout_exercise_details ;
}