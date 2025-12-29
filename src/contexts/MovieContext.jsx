import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  

  /* -----------------------------
     Track auth state
  ------------------------------ */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  /* -----------------------------
     Load favorites when user logs in
  ------------------------------ */
  useEffect(() => {
  if (!user) {
    setFavorites([]);
    setLoadingFavorites(false);
    return;
  }

  const loadFavorites = async () => {
    setLoadingFavorites(true);

    const { data, error } = await supabase
      .from("favorites")
      .select("movie_data")
      .eq("user_id", user.id);

    if (!error) {
      setFavorites(data.map(row => row.movie_data));
    }

    setLoadingFavorites(false);
  };

  loadFavorites();
}, [user]);


  /* -----------------------------
     Add favorite
  ------------------------------ */
  const addToFavorites = async (movie) => {
    if (!user) return;

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      movie_id: movie.id,
      movie_data: movie,
    });

    if (!error) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  /* -----------------------------
     Remove favorite
  ------------------------------ */
  const removeFromFavorites = async (movieId) => {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId);

    if (!error) {
      setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }
  };

  /* -----------------------------
     Check favorite
  ------------------------------ */
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    setUser(null);
    setFavorites([]); // optional: clear local favorites on logout
  }
};

const value = {
  user,
  favorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  loadingFavorites,
  signOut, // ✅ add this
};



  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
