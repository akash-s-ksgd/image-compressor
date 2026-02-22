import React from 'react';
import Compressor from './components/compressor';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Lightning Fast Image Compressor</h1>
      <p>Compress your images directly in the browser. 100% private.</p>
      <Compressor />
    </div>
  );
}

export default App;