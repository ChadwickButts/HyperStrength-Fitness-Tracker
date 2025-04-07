
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'
import { workout } from "../definitions";
import { cache } from "react";

// Server component request
export const getExercises = cache(async () => {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: exercises } = await supabase.from('exercises').select();
    return exercises;
})

// Server component request
export async function getWorkouts() {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: workouts } = await supabase.from('workouts').select();
    return workouts;
}