export const typeDefs = `#graphql
    type Exercise {
        exercisename: String
        force: String 
        level: String 
        mechanic: String 
        equipment: String 
        primaryMuscles: [String] 
        secondaryMuscles: [String] 
        instructions: [String] 
        category: String 
        images: [String] 
        exerciseid: String
    }

    type Workout {
        workoutid: String
        workoutname: String
        date: String
        tracked: Boolean
        userid: Int
    }

    type Workout_Exercises {
        workoutid: String
        workoutname: String
        date: String
        tracked: Boolean
        exerciseid: String
        exercisename: String
    }

    type Query {
        exercises: [Exercise]
        workouts: [Workout]
        workoutsByUser(userid: Int): [Workout]
        workout_exercises(workoutid: String): [Workout_Exercises]
    }
`;