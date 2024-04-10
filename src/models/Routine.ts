import { Exercise } from "./Exercise";

export interface Routine{
    _id?:string;
    uId: string;
    routineName: string; 
    exercises: string[];
}