import { FormEvent, useState } from "react"
import { Exercise } from "../models/Exercise";

export function ExerciseTest() {

    const [exercise, setExercise] = useState<Exercise | null>(null)

    function handleSubmit(event:FormEvent){
        event.preventDefault(); 

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label> Add Exercise</label>
            </form>
        </div>
    )
}