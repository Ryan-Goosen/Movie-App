import { Link } from "react-router-dom";
import { useMovieContext } from '../contexts/MovieContext';
import '../css/NavBar.css'

function NavBar() {
    const { user, signOut } = useMovieContext();

    const handleSignOut = async () => {
    await signOut();
  };
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie List</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            {user ? (
          <button 
            className="nav-link sign-out-btn" 
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="nav-link">Login/SignUp</Link>
        )}
        </div>
    </nav>
}

export default NavBar