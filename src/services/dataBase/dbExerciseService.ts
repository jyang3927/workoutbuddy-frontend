import { db } from "../../firebaseConfig";
import { Exercise } from "../../models/Exercise";
import dbAxiosInstance from "../helpers/dbAxiosInstance";

export const getExerciseById = async(exerciseId: string): Promise<Exercise> => {
    try{
        let response = await dbAxiosInstance.get(`/exercises/${exerciseId}`); 
        return response.data; 
    } catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }   
}

export const createNewExercise = async(exercise: Exercise): Promise<Exercise> => {
    try{
        let response = await dbAxiosInstance.post(`/exercises`, exercise)
        return response.data; 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }   
}

export const deleteExercise = async(exerciseId:string) : Promise<void> => {
    try{
        await dbAxiosInstance.delete(`/exercises/${exerciseId}`); 
        console.log("successful")
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    } 
}

export const editExercise = async(exerciseId:string, exerciseUpdate:Partial<Exercise>): Promise<void> => {
    try{
        await dbAxiosInstance.put(`/exercises/${exerciseId}`, exerciseUpdate); 
    }
    catch(error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    } 
}

//create new exercise in routine 
export const createExerciseInRoutine = async(exercise: Exercise, routineId: string): Promise<Exercise> => {
    try{
        let response = await dbAxiosInstance.post(`/exercises/${routineId}`, exercise); 
        return response.data; 
    }
    catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }
}