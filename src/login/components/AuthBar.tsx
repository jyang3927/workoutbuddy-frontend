import { Button, Container, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/authBar.css"
export function AuthBar () {
    const {signIn, signOut, user} = useAuth();
    return (
        <div className="AuthBar">
            {user ?
            <div>
                <div className="Welcome">
                    <div className="WelcomeHeader">
                        <div className="WelcomeName">Welcome {user.displayName}!</div>
                    </div>
                    <div className="NavBar">
                        <Link to="/calendar"><Button className="Nav">Calendar</Button></Link> 
                        <Link to="/favorites/routines"><Button>My Routines</Button></Link>
                        <Link to="/favorites/exercises"><Button>My Exercises</Button></Link>  
                        <Button className="SignOut" size="small" variant="contained" onClick={signOut}>Sign Out</Button>   
                    </div>
                </div>
                <div>
                    <img className="Logo" src="./img/gym-svgrepo-com.svg" />
                    <p>Trying to ditch archaic methods of tracking workouts?</p>
                    <h4>Well you're in the right place!</h4>
                </div>
            </div>
            :
            <div>
                <Container>
                <h1 className="WelcomeSign">Welcome to Workout Buddy</h1>
                <img className="Logo" src="./img/gym-svgrepo-com.svg" />
                <h3 className="CatchPhrase">The perfect app for recording and favoriting YOUR workouts</h3>
                <form className="loginSection">
                    <FormControl sx={{ width: '25ch' }}>
                    <Button className="GoogleSignIn" onClick={signIn} variant="contained">Sign In With Google</Button>
                    </FormControl>
                </form>
                </Container>
                </div> }
        </div>
    )
}