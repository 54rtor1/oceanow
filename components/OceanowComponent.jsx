import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { motion } from 'framer-motion';
import createSketch from '../public/animation';

const OceanowComponent = ({ lat, lng, onClose }) => {
  const [waveHeight, setWaveHeight] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [displayedHour, setDisplayedHour] = useState(null);

  const Sketch = dynamic(() => import('../public/animation').then(mod => createSketch(mod)), { ssr: false });

  useEffect(() => {
    if (lat && lng) {
      axios
        .get(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height&timezone=auto`
        )
        .then((response) => {
          const { timezone, hourly } = response.data;
          setTimezone(timezone);
          const currentLocalTime = new Date().toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
          });
          setCurrentTime(currentLocalTime);
          const currentHour = currentLocalTime.split(':')[0];
          setDisplayedHour(currentHour);
          const currentHourIndex = parseInt(currentHour, 10);
          const currentWaveHeight = hourly.wave_height[currentHourIndex];
          setWaveHeight(currentWaveHeight);
        })
        .catch((error) => {
          console.error('Error fetching OpenMeteo data:', error);
        });
    }
  }, [lat, lng]);

  return (
    <motion.div
      className="oceanow-container"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
    >
      <div id="p5-container">
        {timezone && <h1>Current Time in {timezone}: {currentTime}</h1>}
        {displayedHour !== null && waveHeight !== null && (
          <h2>Wave Height at {displayedHour}h: {waveHeight} meters</h2>
        )}
        <Sketch />
        <button onClick={onClose}>Close Oceanow</button>
      </div>
    </motion.div>
  );
};

export default OceanowComponent;
