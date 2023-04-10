import React from 'react';
import './App.css';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '.';
import Movies from './movies';
import Podcast from './podcast';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/podcast" element={<Podcast />} />
      </Routes>
    </Router>
  );
}

export default App;
