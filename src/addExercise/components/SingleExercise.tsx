import {Exercise} from "../../models/Exercise"

interface SingleExerciseProps {
    exercise:Exercise
}

export function SingleExercise ({exercise}: SingleExerciseProps) {
    return (
        <div>
            <p>{exercise.name} ({exercise.muscle}): {exercise.type} </p>
            <button>Add Set</button>
            <button>Delete Exercise</button>
        </div>
    )
}