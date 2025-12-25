import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorite(){
    const {favorites} = useMovieContext()

    if (favorites){
        return( 
        <div>
            <h2>Your Favorite Movies</h2>

        <div className="movie-grid">
            {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </div>
    );}


    return <div className="favorites-empty">
        <h2>No favorite Movies yet</h2>
        <p>Start adding movies to your favrioutes and they will apear here.</p>
    </div>
}

export default Favorite