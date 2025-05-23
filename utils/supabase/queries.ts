
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

// Server component request
export const getExercises = cache(async (supabase: SupabaseClient) => {
    const { data: exercises } = await supabase.from('exercises').select();
    return exercises ;
})

// Server component request
export const getWorkouts = cache(async (supabase: SupabaseClient) => {
    
    const { data: workouts } = await supabase.from('workouts').select().order('date', {
        ascending: false
    });
    return workouts ;
})

// Server component request
export const getWorkoutExercises = cache(async (supabase: SupabaseClient) => {
    
    const { data: workout_exercise_details, error } = await supabase.from('workout_exercise_details').select();
    return workout_exercise_details ;
})