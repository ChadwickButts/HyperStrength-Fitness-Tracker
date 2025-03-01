import Link from "next/link"
import ExerciseForm from "../ui/exercise-form"
import PlanWorkout from "../ui/plan-workout"

export default function Page() {

    return (
        <div>
            <nav>
                <br/>
                {/* <ExerciseForm /> */}
                {/* <button>Add an exercise</button>
                <br/>
                <button>Record a PR (Personal Record)</button>
                <br/>
                <button>Workout History</button> */}
            </nav>
            <main>
                <PlanWorkout />
                
                {/* <section>Progress</section>
                <section>Workout Schedule</section>
                <section>Best Lift This Week</section>
                <section>Last PR</section> */}
            </main>
        </div> 
    )
}