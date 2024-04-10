import { useEffect, useState } from "react";
import { Exercise } from "../../models/Exercise";
import { getExerciseById } from "../../services/dataBase/dbExerciseService";

interface ExercisePerRoutineProps{
    exercise:string ;
}

export function ExercisePerRoutine({exercise}:ExercisePerRoutineProps){

    const [exerciseInfo, setExerciseInfo] = useState<Exercise | null>(null); 
    const [exerciseIdSet, setExerciseId] = useState<string>('')


    useEffect(()=> {
        getExerciseInfo(exercise)
    }, [])

    const getExerciseInfo = async(exerciseId:string) => {
        console.log('EXERCISE ID 24', exerciseId)
        let response = await getExerciseById(exerciseId); 
        setExerciseInfo(response);
    }

    console.log("exercise", exercise)
    console.log("EXERCISEID", exerciseInfo)
    console.log("EXERCISE INFO", exerciseInfo)
    return(
        <div>
            {exerciseInfo !== null && 
            <div>
                <p>Exercise: {exerciseInfo.name}</p>
                <p>Sets: {exerciseInfo.sets.map((setInfo) => setInfo.setNumber)}</p>
            </div>}
        </div>
    )
}