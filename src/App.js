import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  const toggleLiveMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLiveMode(!isLiveMode);
      setIsTransitioning(false);
    }, 1000); // Match this with the transition duration in CSS
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTrail(prevTrail => [
        ...prevTrail,
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ].slice(-50)); // Keep only the last 50 points
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTrail(prevTrail => prevTrail.filter(point => 
        Date.now() - point.id < (isLiveMode ? 2000 : 1500)
      ));
    }, 100);

    return () => clearInterval(timer);
  }, [isLiveMode]);

  return (
    <div className="App" style={{ cursor: 'none' }}>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isLiveMode} onChange={toggleLiveMode} />
          <span className="slider round"></span>
        </label>
        <span>{isLiveMode ? 'Anikait Mode' : 'Kanhaiya Mode'}</span>
      </div>
      
      <div className={`content ${isTransitioning ? 'transitioning' : ''}`}>
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
      <img 
        src="/aayush.jpg" 
        alt="Cursor"
        className="custom-cursor" 
        style={{ 
          left: cursorPosition.x, 
          top: cursorPosition.y,
        }}
      />
      {trail.map(point => (
        <div
          key={point.id}
          className={`cursor-trail ${isLiveMode ? 'anikait-trail' : 'kanhaiya-trail'}`}
          style={{
            left: point.x,
            top: point.y,
          }}
        />
      ))}
    </div>
  );
}

export default App;
