import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const SearchBar = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    const loadSuggestions = async () => {

      const movies = await fetchMovies(searchTerm);

      setSuggestions(movies.slice(0, 5));
    };

    if (searchTerm.length > 2) {
      loadSuggestions();
    } else {
      setSuggestions([]);
    }

  }, [searchTerm]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!searchTerm.trim()) return;

    onSearch(searchTerm);

    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {

    setSearchTerm(title);

    onSearch(title);

    setSuggestions([]);
  };

  return (

    <div className="search-container">

      <form onSubmit={handleSubmit} className="search-form">

        <div className="search-input-wrapper">

          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {
            suggestions.length > 0 && (

              <div className="suggestions-box">

                {suggestions.map((movie) => (

                  <div
                    key={movie.imdbID}
                    className="suggestion-item"
                    onClick={() =>
                      handleSuggestionClick(
                        movie.Title
                      )
                    }
                  >
                    {movie.Title}
                  </div>

                ))}

              </div>
            )
          }

        </div>

        <button type="submit">
          Search
        </button>

      </form>

    </div>
  );
};

export default SearchBar;