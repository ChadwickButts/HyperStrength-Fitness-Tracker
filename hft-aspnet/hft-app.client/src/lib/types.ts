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
    force: string | null,
    level: string | null,
    mechanic: string | null,
    equipment: string | null,
    primaryMuscles: Array<string> | null,
    secondaryMuscles: Array<string> | null,
    instructions: Array<string> | null,
    category: string | null,
    images: Array<string> | null,
    exerciseid: string
}

export type exercisesAction = exerciseData & {
    type: string,
    clientId: number
}

export type workoutExercise = {
    workoutid: string,
    exerciseid: string
}

export type workoutExerciseDetails = {
    workoutid: string,
    exerciseid: string
    exercisename: string,
    force: string | null,
    level: string | null,
    mechanic: string | null,
    equipment: string | null,
    primaryMuscles: Array<string> | null,
    secondaryMuscles: Array<string> | null,
    instructions: Array<string> | null,
    category: string | null,
    images: Array<string> | null
}

export type workout = {
    workoutid: string,
    workoutname: string,
    date: string,
    tracked: boolean,
    userid: number
}

export type userInfo = {
    userid: number,
    email: string,
    name: string
}

export type workoutAction = workout & {
    type: string
}