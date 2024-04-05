import { useState } from "react"
import Exercise from "../../models/Exercise"
import { AddExerciseForm } from "./AddExerciseForm"
import { SingleExercise } from "./SingleExercise"

interface FormExerciseListProps {
    exercise: Exercise[]
}

export function FormExerciseList ({exercise}: FormExerciseListProps) {
    const [exercises, setExercises] = useState<Exercise[]>([])

    function addExercise(exercise:Exercise) {
        setExercises([...exercises, exercise])
    }
    return (
        <div>
            <div>{exercises.map((exercise) => (<SingleExercise exercise={exercise} />))}</div>
            <div><AddExerciseForm onExercise={addExercise}></AddExerciseForm></div>
        </div>
    )
}