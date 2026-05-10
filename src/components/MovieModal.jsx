import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMovieDetails } from '../services/api';

const MovieModal = ({ movie, closeModal }) => {

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const data = await fetchMovieDetails(movie.imdbID);
      setMovieDetails(data);
    };

    if (movie) loadMovieDetails();
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>

      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        <button className="close-btn" onClick={closeModal}>
          X
        </button>

        {movieDetails ? (
          <>
            <img
              src={
                movieDetails.Poster !== 'N/A'
                  ? movieDetails.Poster
                  : 'https://via.placeholder.com/300x450'
              }
              alt={movieDetails.Title}
            />

            <div className="modal-info">

              <h2>{movieDetails.Title}</h2>

              <p><strong>Year:</strong> {movieDetails.Year}</p>

              <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>

              <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>

              <p><strong>Genre:</strong> {movieDetails.Genre}</p>

              <p><strong>Director:</strong> {movieDetails.Director}</p>

              <p><strong>Actors:</strong> {movieDetails.Actors}</p>

              <p><strong>Language:</strong> {movieDetails.Language}</p>

              <p><strong>Plot:</strong> {movieDetails.Plot}</p>

              <a
                href={`https://www.youtube.com/results?search_query=${movieDetails.Title}+official+trailer`}
                target="_blank"
                rel="noreferrer"
                className="trailer-btn"
              >
                ▶ Watch Trailer
              </a>
            </div>
          </>
        ) : (
          <h2 className="status-message">Loading details...</h2>
        )}

      </motion.div>

    </div>
  );
};

export default MovieModal;