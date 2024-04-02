import { ExerciseApiResponse } from "../models/ExerciseApiResponse";
import ExerciseAxiosInstance from "./ExerciseAxiosInstance";


//returns exercises from API searched by specific type 
export const searchExerciseType = async(searchType:string):Promise<ExerciseApiResponse[]> => {
    if(!searchType){
        throw new Error("Type is required");
    }
    try{
        const response = await ExerciseAxiosInstance.get('/',{params:{type:searchType}}); 
        return response.data; 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }
}

//returns exercises from API searched by name
export const searchExerciseName = async(searchName:string):Promise<ExerciseApiResponse[]> => {
    if(!searchName){
        throw new Error("Name is required");
    }
    try{
        const response = await ExerciseAxiosInstance.get('/',{params:{name:searchName}}); 
        return response.data; 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }
}

//return exercises from API searched by muscle 
export const searchExerciseMuscle = async(searchMuscle:string):Promise<ExerciseApiResponse[]> => {
    if(!searchMuscle){
        throw new Error("Muscle is required")
    }
    try{
        const response = await ExerciseAxiosInstance.get('/', {params:{muscle:searchMuscle}}); 
        return response.data; 
    }catch(error:any){
        console.log("Error failed to fetch data",error ); 
        throw error; 
    }
}