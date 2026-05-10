import React, { useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

const TrendingMovies = ({
  movies,
  onSelectMovie,
  toggleFavorite,
  favorites,
}) => {

  const scrollRef = useRef(null);

  useEffect(() => {

    const container = scrollRef.current;

    const interval = setInterval(() => {

      if (container) {

        container.scrollLeft += 1;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }

    }, 20);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="trending-section">

      <h2 className="section-title">
        Trending Movies
      </h2>

      <div
        className="trending-container"
        ref={scrollRef}
      >

        {movies.concat(movies).map((movie, index) => (

          <div
            key={`${movie.imdbID}-${index}`}
            className="trending-card"
          >

            <MovieCard
              movie={movie}
              onSelectMovie={onSelectMovie}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />

          </div>

        ))}

      </div>

    </div>
  );
};

export default TrendingMovies;