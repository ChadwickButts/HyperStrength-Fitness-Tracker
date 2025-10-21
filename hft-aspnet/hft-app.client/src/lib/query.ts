
export async function getWorkouts() {
    const workouts = await fetch('/api/workouts');
    return workouts.json();
}

export async function getWorkoutsByUser(userid: number) {
    const workouts = await fetch('/api/workouts/user/' + userid);
    return workouts.json();
}

export async function getExercises() {
    const exercises = await fetch('/api/exercises');
    return exercises.json();
}

export async function getExercisesByIds(ids: string) {
    const exercises = await fetch('/api/exercises/ids/' + ids);
    return exercises.json();
}

export async function getWorkoutExerciseDetails(workoutId: string) {
    const workoutExercises = await fetch('/api/workoutexercisedetails/'+ workoutId);
    return workoutExercises.json();
}
