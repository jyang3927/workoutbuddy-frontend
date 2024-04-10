import { useEffect, useState } from "react";
import { UserActivity } from "../../models/UserActivity";
import { getRoutineById } from "../../services/dataBase/dbRoutineService";
import { Routine } from "../../models/Routine";


interface RoutineForDateProps{
    routineId: string;
}

export function RoutineForDate({routineId}: RoutineForDateProps){

    const [routineObj, setRoutineObj] = useState<Routine | null>(null); 

    const [exercises, setExercises] = useState<string[] | null>(null)

    // useEffect(() => {
    //     if(routineObj){
    //         setExercises(routineObj?.exercises)
    //     }
        
    // }, [routineObj])

    const getRoutineInfo = async(routineIds:string) => {
        let routineArray = await getRoutineById(routineIds); 
        console.log("ROUTINE INFO", routineArray)
        setRoutineObj(routineArray); 
        return routineArray;
    }
    
//    let response = getRoutineInfo(routineId); 
  
    // console.log("RoutineInfo", response)

    return(
        <div> 
            
        </div>
    )
}