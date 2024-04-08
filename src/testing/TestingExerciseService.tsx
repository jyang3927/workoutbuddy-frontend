import { useState } from "react"; 
import { Exercise } from "../models/Exercise";
import {Set} from "../models/Set"; 
import { deleteExercise, editExercise, getExerciseById } from "../services/dataBase/dbExerciseService";
import { createNewExercise } from "../services/dataBase/dbExerciseService";
import { createNewSet, deleteSet, getSetbyId, updateSet } from "../services/dataBase/dbSetService";
export function TestingExerciseService(){

    const [exercise, setExercise] = useState<Exercise>({uId: 'demo', name:'demo', type:'demo', muscle: 'demo', sets:[]}); 
    const [createExercise, setCreateExercise] = useState<Exercise>({uId: 'null', name:'n', type:'n', muscle: 'n', sets:[]}); 

    const [set, setSet] = useState<Set>({uId: 'demo', setNumber: 1})
    const [createSet, setCreateSet] = useState<Set>({uId:'createSet', setNumber: 2})
    const [partialSet, setPartialSet] = useState<Set>({uId: "update", setNumber: 5})
    
    let exid = '6610669d1fa1a4b316d94a9b'; 
    let sid = '66133ab870a53c69c62a9dcf'; 
    let updates = '66133aba70a53c69c62a9dd1';

    const getExercise = async(id:string) => {
        try{
            let response = await getExerciseById(exid); 
            setExercise(response)
            console.log(response)
        }catch(error:any){
            console.log(error)
        }
    }

    const getSet = async(id:string) => {
        try{
            let response = await getSetbyId(sid); 
            setSet(response)
            console.log("set" + response)
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
    const createSetTest = async(set:Set) => {
        try{
            let response = await createNewSet(set); 
            setCreateSet(response)
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
    const deleteSetId = async(id:string) => {
        try{
            await deleteSet(id); 
        }catch (error:any){
            console.log("Error failed to fetch data", error); 
            throw error;
        }   
    }

    const updateSetTest = async(setId:string, updateSetnum: Partial<Set>) => {
        try{
             await updateSet(setId, updateSetnum); 
             console.log("done")
        }catch (error:any){
            console.log("Error failed to fetch data", error); 
            throw error;
        }   
    }

    const updateExerciseTest = async(exerciseId: string, updateExercise: Partial<Exercise>) => {
        try{
            await editExercise(exerciseId, updateExercise); 
            console.log("successful edit")
        }catch (error:any){
            console.log("Error failed to edit data", error); 
            throw error;
        }   
    }

    return(
        <div className="TestingExerciseService">
            <div>
                <h1> Exercise Testing</h1>
                <button onClick={() => getExercise(exid)}> click</button>
                {exercise.name}
                {/* {exercise.name} */}
                <button onClick={() => createExerciseTest({uId: 'delete', name:'delete', type:'demo', muscle: 'demo', sets:[]})}>Add</button>
                {createExercise._id}
                <button onClick={() => deleteExerciseId('66106e231994afbf9ac1df82')}>Delete</button>
                <button onClick={() => updateExerciseTest('66106e236288809696261923', {sets: ["66133ab870a53c69c62a9dcf"]})}>Update</button>
            
            </div>
            <div>
                <h1>Set Testing</h1>
                <button onClick={() => getSet(sid)}> click</button>
                {set._id}
                {/* {exercise.name} */}
                <button onClick={() => createSetTest({uId: 'testSet', setNumber: 3})}>Add</button>
                {createSet._id}
                <button onClick={() => deleteSetId('66133a8670a53c69c62a9dcc')}>Delete</button>
                <button onClick={() => updateSetTest(updates, {setNumber: 0})}>Update</button>
            </div>
        </div>
    )
}