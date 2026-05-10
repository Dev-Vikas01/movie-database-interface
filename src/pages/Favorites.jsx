import React from 'react';
import MovieCard from '../components/MovieCard';

const Favorites = ({
  favorites,
  onSelectMovie,
  toggleFavorite,
}) => {

  return (
    <div>

      <h2 className="favorites-title">
        Favorite Movies
      </h2>

      {
        favorites.length > 0 ? (

          <div className="movies-container">

            {favorites.map((movie) => (

              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSelectMovie={onSelectMovie}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            ))}

          </div>

        ) : (

          <h2 className="status-message">
            No favorite movies yet
          </h2>

        )
      }

    </div>
  );
};

export default Favorites;