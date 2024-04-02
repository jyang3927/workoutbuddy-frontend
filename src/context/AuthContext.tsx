import { GoogleAuthProvider, User,signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import {auth} from '../firebaseConfig';

interface AuthContextType {
    user: User | null; 
    signIn: () => Promise<void>; 
    signOut: () => Promise<void>; 
    isAuthInitializing: boolean; 
}; 

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 

interface AuthProviderProps{
    children:ReactNode; 
}; 

export const AuthProvider = ({children}: AuthProviderProps) => {
    //user state
    const [user, setUser] = useState<User | null>(null); 
    const [isAuthInitializing, setIsAuthInitializing] = useState<boolean>(true); 

    const signIn = async () => {
        const provider = new GoogleAuthProvider(); 
        try{    
            await signInWithPopup(auth, provider); 

        }catch(error:any){
            console.log("Sign in Failed", error); 
        }
    }

    const signOut = async () => {
        try{
            await auth.signOut(); 
        }catch(error:any){
            console.log("Error signing out", error); 
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); 
            setIsAuthInitializing(false); 
        }); 
        return () => unsubscribe(); 
    }, []); 

    return <AuthContext.Provider value ={{user, signIn, signOut, isAuthInitializing}}>
        {children}
    </AuthContext.Provider>

}






