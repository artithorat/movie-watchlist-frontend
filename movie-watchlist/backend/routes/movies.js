const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// ✅ Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err.message);
    res.status(500).json({ error: 'Server error fetching movies' });
  }
});

// ✅ Create a new movie
router.post('/', async (req, res) => {
  try {
    // Avoid _id injection from client
    const { _id, ...movieData } = req.body;

    const movie = new Movie(movieData);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving movie:', err.message);

    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate entry' });
    }

    res.status(500).json({ error: 'Server error saving movie' });
  }
});

// ✅ Update movie (watch status or full edit)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating movie:', err.message);
    res.status(500).json({ error: 'Server error updating movie' });
  }
});

// ✅ Delete movie
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie:', err.message);
    res.status(500).json({ error: 'Server error deleting movie' });
  }
});

module.exports = router;
