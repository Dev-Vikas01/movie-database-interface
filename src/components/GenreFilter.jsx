import React from 'react';

const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Adventure',
];

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {

  return (
    <div className="genre-container">

      {genres.map((genre) => (

        <button
          key={genre}
          className={
            selectedGenre === genre
              ? 'genre-btn active-genre'
              : 'genre-btn'
          }
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </button>

      ))}

    </div>
  );
};

export default GenreFilter;