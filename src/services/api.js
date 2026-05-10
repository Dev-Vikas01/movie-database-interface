import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (movieName = 'Batman') => {

  try {

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${movieName}`
    );

    return response.data.Search || [];

  } catch (error) {

    console.log('Error fetching movies:', error);

    return [];
  }
};

export const fetchMovieDetails = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}`
    );

    return response.data;

  } catch (error) {

    console.log(
      'Error fetching movie details:',
      error
    );

    return null;
  }
};

export const fetchTrendingMovies = async () => {

  try {

    const trendingKeywords = [
      'Avengers',
      'Batman',
      'Marvel',
      'Spider Man',
      'Harry Potter',
    ];

    const randomKeyword =
      trendingKeywords[
        Math.floor(
          Math.random() *
          trendingKeywords.length
        )
      ];

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${randomKeyword}`
    );

    return response.data.Search || [];

  } catch (error) {

    console.log(
      'Error fetching trending movies:',
      error
    );

    return [];
  }
};