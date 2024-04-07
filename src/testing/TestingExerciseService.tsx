import { useState } from "react"; 
import { Exercise } from "../models/Exercise";
import { deleteExercise, getExerciseById } from "../services/dataBase/dbExerciseService";
import { createNewExercise } from "../services/dataBase/dbExerciseService";
export function TestingExerciseService(){

    const [exercise, setExercise] = useState<Exercise>({uId: 'demo', name:'demo', type:'demo', muscle: 'demo', sets:[]}); 
    const [createExercise, setCreateExercise] = useState<Exercise>({uId: 'null', name:'n', type:'n', muscle: 'n', sets:[]}); 

    let exid = '6610669d1fa1a4b316d94a9b'; 

    const getExercise = async(id:string) => {
        try{
            let response = await getExerciseById(exid); 
            setExercise(response)
            console.log(response)
        }catch(error:any){
            console.log(error)
        }
    }

    const createExerciseTest = async(exercise: Exercise) => {
        try{
            let response = await createNewExercise(exercise); 
            setCreateExercise(response); 
            console.log(response)
        }catch (error:any){
            console.log("Error failed to fetch data", error); 
            throw error;
        }   
    }
   
    const deleteExerciseId = async(id: string) => {
        try{
            await deleteExercise(id); 
            console.log("successful")
        }catch (error:any){
            console.log("Error failed to fetch data", error); 
            throw error;
        }   
    }
    
    return(
        <div className="TestingExerciseService">
            <button onClick={() => getExercise(exid)}> click</button>
            {exercise.name}
            {/* {exercise.name} */}
            <button onClick={() => createExerciseTest({uId: 'delete', name:'delete', type:'demo', muscle: 'demo', sets:[]})}>Add</button>
            {createExercise._id}
            <button onClick={() => deleteExerciseId('66106e231994afbf9ac1df82')}>Delete</button>
        </div>
    )
}