const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();

// ===== Middleware =====
// Enable CORS for frontend running on localhost:3000 (React default)
app.use(cors({
  origin: 'http://localhost:3000',  // allow only frontend domain
  credentials: true,                // if you need cookies/auth headers
}));

app.use(express.json()); // Parse incoming JSON requests

// ===== Root Route =====
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ===== Connect to MongoDB =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ===== API Routes =====
app.use('/api/movies', require('./routes/movies'));

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
