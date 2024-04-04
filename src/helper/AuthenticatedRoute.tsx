import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface AuthenticatedRouteProps {
    children:ReactNode
    authenticationPath:string
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({children, authenticationPath}) => {
    const {user, isAuthInitializing} = useAuth()

    if(isAuthInitializing) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to={authenticationPath} replace></Navigate>
    }
    return <>{children}</>
}