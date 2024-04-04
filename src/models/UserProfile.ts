import Exercise from "./Exercise";
import { Routine } from "./Routine";

export type ExerciseWithoutSet = Omit<Exercise, 'sets'>

export interface UserProfile{
    _id?: string; 
    uId?: string; 
    userName: string; 
    favExercises: ExerciseWithoutSet[]; 
    favRoutines: Routine[]; 
}