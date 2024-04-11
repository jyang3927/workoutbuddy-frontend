import { useEffect, useState } from "react";
import { UserActivity } from "../../models/UserActivity";
import { getRoutineById } from "../../services/dataBase/dbRoutineService";
import { Routine } from "../../models/Routine";
import { ExercisePerRoutine } from "./ExercisePerRoutine";
import '../../styles/routineForDate.css'

interface RoutineForDateProps{
    routine: Routine;
}

export function RoutineForDate({routine}: RoutineForDateProps){

    const [routineObj, setRoutineObj] = useState<Routine | null>(null); 

    const [exercises, setExercises] = useState<string[] | null>(null)

//     // useEffect(() => {
//     //     if(routineObj){
//     //         setExercises(routineObj?.exercises)
//     //     }
        
//     // }, [routineObj])

//     const getRoutineInfo = async(routineIds:string) => {
//         let routineArray = await getRoutineById(routineIds); 
//         console.log("ROUTINE INFO", routineArray)
//         // setRoutineObj(routineArray); 
//         return routineArray;
//     }
    
// //    let response = getRoutineInfo(routineId); 
    // console.log("Routine", routine.exercises
    // )
    // console.log("RoutineExercisesLength", routine.exercises.length)
    // console.log("Routines Exercises Array", routine.exercises[0])

    return(
        <div className="RoutineDiv"> 
            <div className="RoutineLabel">ROUTINE <span className="RoutineName">: {routine.routineName}</span></div>
            <div>
            {routine.exercises.length !== 0 && routine.exercises.map((exercises) => <ExercisePerRoutine exercise={exercises}/>)}
            </div>
        </div>
    )
}