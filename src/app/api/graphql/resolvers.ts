import { Resolvers } from '@apollo/client';
import { Exercise, Workout, Workout_Exercises } from '../../../types';
import { exerciseData } from '@/app/lib/definitions';

export const resolvers: Resolvers = {
    Query: {
        exercises: async (parent: any, args: any, context: any ) => { 
            return await context.db<Exercise[]>`SELECT * FROM public.exercises`
        },

        workouts: async (parent: any, args: any, context: any ) => { 
            return await context.db<Workout[]>`SELECT * FROM public.workouts ORDER BY date DESC`
        },

        workout_exercises: async (parent: any, args: any, context: any ) => { 
            return await context.db<Workout_Exercises[]>`SELECT * FROM public.workout_exercise_details 
            WHERE workoutid = ${args.workoutid}`
        }
    }
}