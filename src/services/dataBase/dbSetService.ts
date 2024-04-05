import dbAxiosInstance from "../helpers/dbAxiosInstance";
import { Set } from "../../models/Set";

export const getSetbyId = async(id: string): Promise<Set> => {
    try{
        const response = await dbAxiosInstance.get(`/sets/${encodeURIComponent(id)}`); 
        return response.data; 
    }catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error; 
    }
}