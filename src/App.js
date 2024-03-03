// Stopwatch.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapCounter, setLapCounter] = useState(1);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLapCounter(1);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, elapsedTime]);
    setLapCounter(lapCounter + 1);
    console.log(laps)
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <p className="display">{formatTime(elapsedTime)}</p>
      <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap}>Lap</button>
      <ul>
        {laps.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
