export type exercise = {
    exerciseName: string,
    sets: number,
    reps: number,
    weight: number,
    metric: 'lbs' | 'kg',
    tempo: string
}

export type exerciseData = {
    exercisename: string,
    exerciseid: string
    force: string | null,
    level: string | null,
    mechanic: string | null,
    equipment: string | null,
    primaryMuscles: Array<string> | null,
    secondaryMuscles: Array<string> | null,
    instructions: Array<string> | null,
    category: string | null,
    images: Array<string> | null,
}

export type exercisesAction = exerciseData & { 
    type: string,
    clientId: number
}

export type workout = {
    workoutid: string,
    workoutname: string,
    date: string
    tracked: boolean
}

export type workout_exercises = exerciseData & workout;

export type workoutAction = workout & {
    type: string
}