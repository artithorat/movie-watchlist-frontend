import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, refresh }) => {
  return (
    <div>
      {movies.map(movie => (
        <MovieItem key={movie._id} movie={movie} refresh={refresh} />
      ))}
    </div>
  );
};

export default MovieList;
