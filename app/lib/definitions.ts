export type exercise = {
    exerciseName: string,
    sets: number,
    reps: number,
    weight: number,
    metric: 'lbs' | 'kg',
    tempo: string
}

export type exerciseData = {
    name: string
    force: string | null,
    level: string,
    mechanic: string | null,
    equipment: string | null,
    primaryMuscles: Array<string>,
    secondaryMuscles: Array<string>,
    instructions: Array<string>,
    category: string,
    images: Array<string>,
    id: string
}

export type exercisesAction = exerciseData & { 
    type: string 
}