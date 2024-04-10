import { Button, Container, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/authBar.css";
import { useEffect } from "react";

const imageSources: string[] = [
  "./img/gym-svgrepo-com.svg",
  "./img/image1.svg",
  "./img/image2.svg",
  "./img/image3.svg",
  "./img/image4.svg",
  "./img/image5.svg",
];

let currentIndex: number = 0;
export function rotateImages(): void {
  const imageContainer: HTMLImageElement | null =
    document.querySelector("#Logo");
  if (!imageContainer) return;
  imageContainer.src = imageSources[currentIndex];
  currentIndex = (currentIndex + 1) % imageSources.length;

  setTimeout(rotateImages, 5050);
}
//I havent called this function but it will rotate images based on the images provided
export function AuthBar() {
  const { signIn, signOut, user } = useAuth();
  useEffect(() => {
    rotateImages();
  }, []);
  return (
    <div className="AuthBar">
      {user ? (
        <div>
          <div className="Welcome">
            <div className="WelcomeHeader">
              <div className="WelcomeName">Welcome {user.displayName}!</div>
            </div>
            <div className="NavBar">
              <Link to="/calendar">
                <Button className="Nav">Calendar</Button>
              </Link>
              <Link to="/favorites/routines">
                <Button>My Routines</Button>
              </Link>
              <Link to="/favorites/exercises">
                <Button>My Exercises</Button>
              </Link>
              <Button
                className="SignOut"
                size="small"
                variant="contained"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
          <div>
            <img id="Logo" className="Logo" src={imageSources[0]} alt="Logo" />
            <p>Trying to ditch archaic methods of tracking workouts?</p>
            <h4>Well you're in the right place!</h4>
          </div>
        </div>
      ) : (
        <div>
          <Container>
            <h1 className="WelcomeSign">Welcome to Workout Buddy</h1>
            <img id="Logo" className="Logo" src={imageSources[0]} alt="Logo" />
            <h3 className="CatchPhrase">
              The perfect app for recording and favoriting YOUR workouts
            </h3>
            <form className="loginSection">
              <FormControl sx={{ width: "25ch" }}>
                <Button
                  className="GoogleSignIn"
                  onClick={signIn}
                  variant="contained"
                >
                  Sign In With Google
                </Button>
              </FormControl>
            </form>
          </Container>
        </div>
      )}
    </div>
  );
}
