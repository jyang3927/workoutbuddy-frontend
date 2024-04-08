import { useState } from "react"
import {Exercise} from "../../models/Exercise"
import { AddExerciseForm } from "./AddExerciseForm"
import { FormExerciseList } from "./FormExerciseList"

export function Entries () {
    const [exercises, setExercises] = useState<Exercise[]>([])
    
    function addExercise(exercise:Exercise) {
        setExercises([...exercises, exercise])
    }
    return (
        <div>
            <AddExerciseForm onExercise={addExercise}></AddExerciseForm>
            <FormExerciseList exercise={exercises}></FormExerciseList>
        </div>
    )
}