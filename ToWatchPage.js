import React, { useEffect, useState } from 'react';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';

const ToWatchPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/movies');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMovies(data.filter(m => !m.watched));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div>
      <MovieForm onAdd={fetchMovies} />
      <MovieList movies={movies} refresh={fetchMovies} />
    </div>
  );
};

export default ToWatchPage;
