import { useContext } from "react";
import { UserProfileContext } from "../context/UsersProfileContext";

export const useUser = () => {
    const context = useContext(UserProfileContext); 
    if(context === undefined){
        throw new Error("useUser must be used within UserProvider");
    }
    return context; 
}



