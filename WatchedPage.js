import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

const WatchedPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:5000/api/movies');
    const data = await res.json();
    setMovies(data.filter(m => m.watched));
  };

  return (
    <div>
      <MovieList movies={movies} refresh={fetchMovies} />
    </div>
  );
};

export default WatchedPage;
