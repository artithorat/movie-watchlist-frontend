import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToWatchPage from './pages/ToWatchPage';
import WatchedPage from './pages/WatchedPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>🎬 Movie Watchlist</h1>
          <nav>
            <Link to="/" style={{ marginRight: '10px' }}>To Watch</Link>
            <Link to="/watched">Watched</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ToWatchPage />} />
            <Route path="/watched" element={<WatchedPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
