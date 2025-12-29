import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext';


function MovieCard({movie}){
    const {user, isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavClick(e) {
    e.preventDefault();

    if (!user) {
      alert('Please log in to save favorites');
      return;
    }

    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }



    return (
    <div className={`movie-card ${favorite ? "liked" : ""}`}>
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
    );
}

export default MovieCard