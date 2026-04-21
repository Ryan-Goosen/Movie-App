import { supabase } from './supabaseClient';

export async function fetchFavorites(userId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('movie_data')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(row => row.movie_data);
}

export async function addFavorite(userId, movie) {
  const { error } = await supabase.from('favorites').insert({
    user_id: userId,
    movie_id: movie.id,
    movie_data: movie,
  });

  if (error) throw error;
}

export async function removeFavorite(userId, movieId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId);

  if (error) throw error;
}
