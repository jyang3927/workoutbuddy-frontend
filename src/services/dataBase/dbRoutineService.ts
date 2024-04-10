import { Routine } from "../../models/Routine";
import dbAxiosInstance from "../helpers/dbAxiosInstance";

export const getRoutineById = async(routineId:string): Promise<Routine> => {
    try{
        let response = await dbAxiosInstance.get(`/routines/${routineId}`); 
        return response.data; 
    } catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }
}

export const createNewRoutine = async(routine: Routine, userActivityId: string): Promise<Routine> => {
    try{
        let response = await dbAxiosInstance.post(`/routines/${userActivityId}`, routine); 
        return response.data; 
    }
    catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }
}

export const editRoutine = async(routineId:string, routineUpdate:Partial<Routine> ): Promise<void> => {
    try{
        await dbAxiosInstance.put(`routines/${routineId}`, routineUpdate); 
    }
    catch(error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    } 
}

export const deleteRoutine = async(routineId:string): Promise<void> => {
    try{
        await dbAxiosInstance.delete(`/routines/${routineId}`); 
        console.log("successful")
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    } 
}