import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseClient = createClient(supabaseUrl, supabaseKey);


export async function getExercisesClient() {
    const { data: exercises } = await supabaseClient.from('exercises').select();

    return exercises;
}

export async function getWorkoutsClient() {
    const { data: workouts } = await supabaseClient.from('workouts').select();

    return workouts;
}