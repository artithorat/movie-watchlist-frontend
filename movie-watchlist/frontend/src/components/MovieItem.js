import React from 'react';

const MovieItem = ({ movie, refresh }) => {
  const toggleWatched = async () => {
    await fetch(`http://localhost:5000/api/movies/${movie._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watched: !movie.watched }),
    });
    refresh();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/movies/${movie._id}`, {
      method: 'DELETE',
    });
    refresh();
  };

  return (
    <div>
      <strong>{movie.title}</strong> ({movie.year}) - {movie.genre} 
      <button onClick={toggleWatched}>
        Mark as {movie.watched ? 'To Watch' : 'Watched'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MovieItem;
