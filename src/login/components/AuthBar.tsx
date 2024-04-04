import { Button, Container, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function AuthBar () {
    const {signIn, signOut, user} = useAuth();
    return (
        <div className="AuthBar">
        {user ?
        <div>
            <div>Welcome!
            <Link to="/calendar"><Button>Calendar</Button></Link> 
            <Link to="/favorites/routines"><Button>My Routines</Button></Link>
            <Link to="/favorites/exercises"><Button>My Exercises</Button></Link>     
            <Button onClick={signOut}>Sign Out</Button>
            </div>
            <div>
                <img src="./img/workout.png" />
                <p>Trying to ditch archaic methods of tracking workouts?</p>
                <h4>Well you're in the right place!</h4>
            </div>
        </div>
            :
            <div>
                <Container>
                <h1>Welcome to WorkoutBuddy</h1>
                <h3>The perfect app for recording and favoriting YOUR workouts</h3>
                <form className="loginSection">
                    <FormControl sx={{ width: '25ch' }}>
                    <Button onClick={signIn} variant="contained">Sign In With Google</Button>
                    </FormControl>
                </form>
                </Container>
                </div> }
        </div>
    )
}