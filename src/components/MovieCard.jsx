import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
const MovieCard = ({
  movie,
  onSelectMovie,
  toggleFavorite,
  favorites,
}) => {

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  return (
    <motion.div
        className="movie-card"
        onClick={() => onSelectMovie(movie)}

        whileHover={{
            scale: 1.05,
        }}

        initial={{
            opacity: 0,
            y: 20,
        }}

        animate={{
            opacity: 1,
            y: 0,
        }}

        transition={{
            duration: 0.3,
        }}
        >

      <div
        className="favorite-icon"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie);
        }}
      >
        <FaHeart
          color={isFavorite ? 'crimson' : 'white'}
        />
      </div>

      <img
        src={
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/300x450'
        }
        alt={movie.Title}
      />

      <div className="movie-info">

        <h3>{movie.Title}</h3>

        <p>{movie.Year}</p>

      </div>

    </motion.div>
  );
};

export default MovieCard;