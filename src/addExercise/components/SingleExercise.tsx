import { useEffect, useState } from "react"
import {Exercise} from "../../models/Exercise"
import { Set } from "../../models/Set"
import { SingleSet } from "./SingleSet"
import { SetForm } from "./SetForm"

interface SingleExerciseProps {
    exercise:Exercise
}

export function SingleExercise ({exercise}: SingleExerciseProps) {
    const [sets, setSets] = useState<Set[]>([])
    const [exId, setExId] = useState<string>('')

    function addSet(set:Set) {
        setSets([...sets, set])
        if(exercise._id){
        setExId(exercise._id)
        }
    }

    return (
        <div style={{display: 'flex', backgroundColor: 'red', border:'10px solid black'}}>
            <p>{exercise.name} ({exercise.muscle}): {exercise.type} </p>
            <p>{exercise._id}</p>
            <SetForm onSet={addSet} exerciseId={exId}></SetForm>
            <div>{sets.map((set) => (<SingleSet set={set} />))}</div>
            <button>View Sets</button>
            <button>Delete Exercise</button>
        </div>
    )
}