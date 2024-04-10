import { Routine } from "./Routine";

export interface UserActivity{
    _id?:string;
    uId: string; 
    date: Date; 
    routines: Routine[]; 
    workedOut: boolean; 
}