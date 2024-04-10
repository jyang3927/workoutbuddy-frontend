import { Set } from "./Set";

export interface Exercise {
    _id?:string; 
    uId: string;
    name: string;
    type: string; 
    muscle: string; 
    sets: Set[]
  }