import fetch from 'node-fetch';

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.MOVIE_API_KEY; // server-side key, safe

export default async function handler(req, res) {
  const { query } = req.query; // optional query param

  let url;
  if (query) {
    // search endpoint
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  } else {
    // popular movies
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  }

  try {
    console.log("API_KEY")

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
