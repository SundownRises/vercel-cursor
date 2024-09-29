import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLiveMode, setIsLiveMode] = useState(false);

  const toggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
  };

  return (
    <div className="App">
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isLiveMode} onChange={toggleLiveMode} />
          <span className="slider round"></span>
        </label>
        <span>{isLiveMode ? 'Anikait Mode' : 'Kanhaiya Mode'}</span>
      </div>
      
      {isLiveMode ? (
        <video className="live-video" autoPlay loop muted>
          <source src="/live.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <header className="App-header">
          <img src="/kan.jpg" className="Kan-image" alt="Kan" />
          <p>
            WHILE YOU WERE SLEEPING, I WAS DOING MY SIGMA GRINDSET
          </p>
          <a
            className="App-link"
            href="https://www.youtube.com/watch?v=HfykDbJIanM"
            target="_blank"
            rel="noopener noreferrer"
          >
            LISTEN TO THE BEAT
          </a>
        </header>
      )}
    </div>
  );
}

export default App;
