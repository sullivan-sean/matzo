import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const getColor = (percent: number) => {
  if (percent > 35) {
    return "#00dcb3";
  }
  if (percent > 15) {
    return "#ffc200"
  }
  return "#ff0000"
}

const LAST_DATE = new Date(2022, 3, 26, 21, 30);
const currentDayDiff = (): number => {
  const now = new Date();
  const timeDiff = now.getTime() - LAST_DATE.getTime();  
  return timeDiff / (1000 * 60 * 60 * 24);
}

function App() {
  const [dayDiff, setDayDiff] = useState(currentDayDiff());
  useEffect(() => {
    const interval = setInterval(() => {
      setDayDiff(currentDayDiff());
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const percent = Math.max(100 - Math.round(dayDiff / 7 * 100 * 10) / 10, 0);

  return (
    <div className="App">
      <div className="App-header">
        <span><b>Matzo Meter</b></span>
        <div className="progress">
          <div className="progress-inner" style={{ backgroundColor: getColor(percent), height: `${percent}%` }}>
            <span><b>{percent}%</b></span>
          </div>
        </div>
        <div>Days Since Eli Made Matzo Balls: <span style={{ color: getColor(percent) }}>{dayDiff}</span> days</div>
      </div>
    </div>
  );
}

export default App;
