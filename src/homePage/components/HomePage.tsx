import { Link } from "react-router-dom"
import { AuthBar } from "../../login/components/AuthBar"
import { goToFavoriteEx } from "../../services/goToFavoriteEx"

export function HomePage() {
    return(
        <div className="HomePage">
            <AuthBar />
            <Link to="/profile">User Profile</Link>
            <button onClick={goToFavoriteEx}>View Favorite Exercises</button>
            This is the main page!
        </div>
    )
}