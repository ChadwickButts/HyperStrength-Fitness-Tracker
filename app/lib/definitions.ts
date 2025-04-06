export type exercise = {
    exerciseName: string,
    sets: number,
    reps: number,
    weight: number,
    metric: 'lbs' | 'kg',
    tempo: string
}

export type exerciseData = {
    name: string,
    force: string | null,
    level: string | null,
    mechanic: string | null,
    equipment: string | null,
    primaryMuscles: Array<string> | null,
    secondaryMuscles: Array<string> | null,
    instructions: Array<string> | null,
    category: string | null,
    images: Array<string> | null,
    id: string
}

export type exercisesAction = exerciseData & { 
    type: string,
    clientId: number
}

export type workout = {
    id: string,
    name: string,
    date: string,
    exercises: string[]
}

export type workoutAction = workout & {
    type: string
}