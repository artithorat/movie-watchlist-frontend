import React, { useState } from 'react';

const MovieForm = ({ onAdd }) => {
  const [movie, setMovie] = useState({ title: '', genre: '', year: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { title, genre, year } = movie;

      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, year, watched: false }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add movie');
      }

      setMovie({ title: '', genre: '', year: '' }); // Reset form
      onAdd(); // Notify parent to refresh movie list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
        required
      />
      <input
        name="genre"
        placeholder="Genre"
        value={movie.genre}
        onChange={handleChange}
      />
      <input
        name="year"
        placeholder="Year"
        value={movie.year}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default MovieForm;
