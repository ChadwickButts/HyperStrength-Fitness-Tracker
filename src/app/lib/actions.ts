'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from 'next/headers'
import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession } from "./session";


export async function addExercise(formData: FormData) {
    console.log(formData)
}

export async function createWorkout(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    // const supabase = createCookieClient();

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

// first parameter added because signup-form client component uses useActionState
export async function signUpUser(initialState: any, formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const email = formData.get('email')!;
    const password = formData.get('password')?.toString()!;
    const hashWord = bcrypt.hashSync(password, 10);

    const userId = await supabase.from('user_auth').select('id').eq('email', email);

    if (userId.data?.length === 0) {
        try {
            const { data, error } = await supabase
                .from('user_auth')
                .insert([
                    {
                        email: email,
                        password: hashWord
                    }
                ]).select('id');

            const token = jwt.sign({
                id: data![0].id,
                email
            }, process.env.JWT_SECRET!, {expiresIn: '2d'});

            return {
                status: 200,
                token: token
            };
        } catch (error) {
            // message: 'Something went wrong.',
            return {
                status: 400,
                error: error
            };
        }
    } else {
        // message: 'Email already exists.',
        return {
            status: 409,
            userId: userId.data![0].id
        };
    }

}

export async function loginUser(initialState: any, formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const email = formData.get('email')!;
    const password = formData.get('password')?.toString()!;

    const userData = await supabase.from('user_auth').select('id, password').eq('email', email);

    if (userData.data?.length === 0) {
        return {
            status: 401,
            error: new Error('Email/Password is invalid.')
        };
    }
    
    const isValidLogin = await bcrypt.compare(password, userData.data![0].password);

    if (isValidLogin) {
            createSession(userData.data![0].id)
            redirect('/account')
    } else {
        return {
            status: 401,
            error: new Error('Email/Password is invalid.')
        };
    }

}