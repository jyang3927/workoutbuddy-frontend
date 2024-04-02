import axios from "axios";
import { ExerciseApiResponse } from "../models/ExerciseApiResponse";

const apiUrl = process.env.REACT_APP_BASE_URL || ""; 
const apiKey = process.env.REACT_APP_API_KEY || ""; 

// export const searchExerciseType = async (searchType:string) : Promise<ExerciseApiResponse[]> => {
//     if(!searchType){
//         throw new Error("Type is required");
//     }
//     let response = await axios.get<ExerciseApiResponse[]>(`${apiUrl}`,{headers: {"X-Api-Key": apiKey}, params:{type:searchType}})

// }