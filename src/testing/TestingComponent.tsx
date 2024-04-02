import { useState } from "react"
import { ExerciseApiResponse } from "../models/ExerciseApiResponse"
import { searchExerciseType, searchExerciseName, searchExerciseMuscle } from "../services/ExerciseApiService"

export function TestingComponent(){
    const [exercises, setExercises] = useState<ExerciseApiResponse[]>([]); 
    const [nameExercise, setNameExercise] = useState<ExerciseApiResponse[]>([]); 
    const [name, setName] = useState<string>(""); 
    const [muscle, setMuscle] = useState<ExerciseApiResponse[]>([]); 

    const getExercises = async(type:string) => {
        try{
            let response = await searchExerciseType(type); 
            setExercises(response)
        }catch(error:any){
            console.log("API request failed")
        }
    }

    const getExercisesName = async(name:string) => {
        try{
            let response = await searchExerciseName(name); 
            setNameExercise(response)
        }catch(error:any){
            console.log("Failed")
        }
    }

    const getExercisesMuscle = async(muscle:string) => {
        try{
            let response = await searchExerciseMuscle(muscle); 
            setMuscle(response)
        }catch(error:any){
            console.log("Failed")
        }
    }


    return(
        <div>
            <button onClick={() => getExercises("strength")}>cardio</button>
            {exercises.map(item => <div><div>{item.name}</div>
            <div>{item.difficulty}</div></div>)}
            <input type="text" onChange={(e) => setName(e.target.value)}></input> 
            <button onClick={() => getExercisesName(name)}>click</button>
            {nameExercise.map(item => <div>{item.name}</div>)}
            <button onClick={() => getExercisesMuscle("abdominals")}>abs</button>
            {muscle.map(item => <div><div>{item.name}</div>
            <div>{item.difficulty}</div></div>)}
        </div>
    )
 }