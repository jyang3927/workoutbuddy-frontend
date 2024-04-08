import {Exercise} from "../../models/Exercise"
import { SetForm } from "./SetForm"

interface SingleExerciseProps {
    exercise:Exercise
}

export function SingleExercise ({exercise}: SingleExerciseProps) {
    return (
        <div style={{display: 'flex', backgroundColor: 'red', border:'10px solid black'}}>
            <p>{exercise.name} ({exercise.muscle}): {exercise.type} </p>
            <SetForm></SetForm>
            <button>View Sets</button>
            <button>Delete Exercise</button>
        </div>
    )
}