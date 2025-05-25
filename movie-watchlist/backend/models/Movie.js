const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },  // required field
  genre: String,
  year: Number,              // year as Number is usually better for filtering/sorting
  watched: { type: Boolean, default: false }
});

module.exports = mongoose.model('Movie', movieSchema);
