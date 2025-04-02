
import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'
import { exerciseData } from "../definitions";
import { Usable } from "react";


// Server component request
export async function getExercises() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: exercises } = await supabase.from('exercises').select();
    return exercises ;
}