import { Set } from "./Set";

export default interface Exercise {
    name: string;
    type: string; 
    muscle: string; 
    sets: Set[]; 
}