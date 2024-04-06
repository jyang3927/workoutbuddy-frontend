import { useContext } from "react";
import { UserActivityContext } from "../context/UserActivityContext";

export const useUserActivity = () => {
    const context = useContext(UserActivityContext); 
    if(context === undefined){
        throw new Error("useUser must be used within UserActivity");
    }
    return context; 
}
