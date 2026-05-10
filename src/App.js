import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import HeroBanner from './components/HeroBanner';
import TrendingMovies from './components/TrendingMovies';
import Favorites from './pages/Favorites';
import { fetchMovies,fetchTrendingMovies,} from './services/api';
import './styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    loadMovies();
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const loadMovies = async (
    searchTerm = 'Batman'
  ) => {
    setLoading(true);
    const movieData = await fetchMovies(searchTerm);
    setMovies(movieData);
    setLoading(false);
  };

  const loadTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    setTrendingMovies(data);
  };

  const handleSearch = (movieName) => {
    loadMovies(movieName);
  };

  const toggleFavorite = (movie) => {
    const alreadyFavorite = favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );
    let updatedFavorites;
    if (alreadyFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      );
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );
  };

  const toggleTheme = () => {
    setTheme(
      theme === 'dark'
        ? 'light'
        : 'dark'
    );
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroBanner />

                  <TrendingMovies
                    movies={trendingMovies}
                    onSelectMovie={setSelectedMovie}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                  <SearchBar
                    onSearch={handleSearch}
                  />
                  <GenreFilter
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                  />
                  {
                    loading ? (
                      <h2 className="status-message">
                        Loading movies...
                      </h2>

                    ) : movies.length > 0 ? (
                      <div className="movies-container">
                        {movies.map((movie) => (
                          <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onSelectMovie={setSelectedMovie}
                            toggleFavorite={toggleFavorite}
                            favorites={favorites}
                          />
                        ))}
                      </div>
                    ) : (
                      <h2 className="status-message">
                        No movies found
                      </h2>
                    )
                  }
                </>
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onSelectMovie={setSelectedMovie}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
          <MovieModal
            movie={selectedMovie}
            closeModal={() =>
              setSelectedMovie(null)
            }
          />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;