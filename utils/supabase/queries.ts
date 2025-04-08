
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

// Server component request
export const getExercises = cache(async (supabase: SupabaseClient) => {
    const { data: exercises } = await supabase.from('exercises').select();
    return exercises ;
})

// Server component request
export const getWorkouts = cache(async (supabase: SupabaseClient) => {
    
    const { data: workouts } = await supabase.from('workouts').select();
    return workouts ;
})