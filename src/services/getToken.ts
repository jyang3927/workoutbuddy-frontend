import {auth} from "../firebaseConfig"; 
import { useAuth } from "../hooks/useAuth";

export const GetToken = async(): Promise<string | null> => {
    const {user, isAuthInitializing} = useAuth(); 

    if(!isAuthInitializing){
        if(user){
            return user.getIdToken(); 
        }else {
            return null;
        }
    }else {
        return null;
    }
}