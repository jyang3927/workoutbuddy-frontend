import { ReactNode, createContext, useState } from "react";
import { UserProfile } from "../models/UserProfile";
import Exercise from "../models/Exercise";
import { Routine } from "../models/Routine";
import { useAuth } from "../hooks/useAuth";

interface UserProfileContextType{
    getFavoriteExercises: () => void; 
    getFavoriteRoutines: () => void; 
    addFavoriteExercise: (exercise:Exercise) => void; 
    deleteFavoriteExercise: (id: string) => void; 
    // userProfile: UserProfile; 
    favoriteExercises: Exercise[]; 
    favoriteRoutines: Routine[]; 
}

export const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined); 

interface UserProfileProviderProps{
    children: ReactNode; 
}; 

export const UserProfileProvider = ({children}: UserProfileProviderProps) => {

    // const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [favoriteExercises, setFavoriteExercises] = useState<Exercise[]>([]); 
    const [favoriteRoutines, setFavoriteRoutines] = useState<Routine[]>([]); 

    useEffect(() => {

    })

    function getFavoriteExercises(){
        
    }

    function getRoutines(){

    }

    function addFavoriteExercise(exercise: Exercise ) {
    
    }
    function deleteFavoriteExercise(id:string ) {
        
    }

    return <UserProfileContext.Provider value ={{addFavoriteExercise, deleteFavoriteExercise, favoriteExercises, favoriteRoutines}}>
        {children}
    </UserProfileContext.Provider>

}
