import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL || ""; 
const apiKey = process.env.REACT_APP_API_KEY || ""; 

const ExerciseAxiosInstance = axios.create({baseURL: `${apiUrl}`, timeout: 1000, headers: {"X-Api-Key": apiKey}}); 

export default ExerciseAxiosInstance; 