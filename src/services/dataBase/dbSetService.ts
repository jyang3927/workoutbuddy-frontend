import dbAxiosInstance from "../helpers/dbAxiosInstance";
import { Set } from "../../models/Set";

export const getSetbyId = async(setId: string): Promise<Set> => {
    try{
        const response = await dbAxiosInstance.get(`/sets/${encodeURIComponent(setId)}`); 
        return response.data; 
    }catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; 
    }
}

export const createNewSet = async(set: Set): Promise<Set> => {
    try{
        let response = await dbAxiosInstance.post(`/sets`, set)
        return response.data; 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }   
}

export const updateSet = async(setId: string, setUpdate: Partial<Set>): Promise<void> => {
    try{
        await dbAxiosInstance.put(`/sets/${setId}`, setUpdate); 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }   
}

export const deleteSet = async(setId: string): Promise<void> => {
    try{
        await dbAxiosInstance.delete(`/sets/${setId}`); 
    }catch (error:any){
        console.log("Error failed to fetch data", error); 
        throw error;
    }  
}