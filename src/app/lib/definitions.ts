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

export type workout = {
    workoutid: string,
    workoutname: string,
    date: string,
    exercises: string[],
    tracked: boolean
}

export type workoutAction = workout & {
    type: string
}