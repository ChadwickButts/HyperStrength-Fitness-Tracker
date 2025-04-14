'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'
import dayjs from "dayjs";

export async function addExercise(formData: FormData) {
    console.log(formData) 
}

export async function createWorkout(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let scheduledDate: string = formData.get('workoutDate')!.toString();

    const { data, error } = await supabase
        .from('workouts')
        .insert([
            { 
                name: formData.get('workoutName')?.toString(),
                date: dayjs(scheduledDate).format('YYYY-MM-DD HH:mm:ss').toString(),
                exercises: formData.get('exercises')?.toString().split(','),
                tracked: false
            }
        ]).select();

        return data;
}
