import { ReactNode, createContext, useState, useEffect } from "react";
import { UserActivity } from "../models/UserActivity";

interface UserActivityContextType {
    userActivity: UserActivity; 
}; 

export const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined); 

interface UserActivityProviderProps {
    children: ReactNode; 
}; 

export const UserActivityProvider = ({children}: UserActivityProviderProps) => {

    const [userActivity, setUserActivity] = useState<UserActivity | null>(null); 

    // useEffect( 
    //     ,[]); 



        
    // return <UserActivityContext.Provider value ={{userActivity}}>
    //     {children}
    // </UserActivityContext.Provider>
}; 