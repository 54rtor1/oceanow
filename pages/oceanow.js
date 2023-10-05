import { useEffect, useState, useRef } from 'react';
import p5 from 'p5';
import { sketch } from '../public/animation'; // Import your sketch function
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AnimationPage() {
  const router = useRouter();
  const { lat, lng } = router.query;
  const [waveHeight, setWaveHeight] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [displayedHour, setDisplayedHour] = useState(null);
  const sketchRef = useRef(null); // Ref to store p5 instance

  useEffect(() => {
    const container = document.getElementById('p5-container');

    // Check if the sketch has not been created yet
    if (!sketchRef.current) {
      // Create a p5.js instance and attach it to the container element
      sketchRef.current = new p5(sketch, container);
    }

    // Fetch wave height data from the OpenMeteo API using lat and lng
    if (lat && lng) {
      axios
        .get(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height&timezone=auto`
        )
        .then((response) => {
          const { timezone, hourly } = response.data;
          setTimezone(timezone);

          // Get the current time in the specified timezone
          const currentLocalTime = new Date().toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
          });
          setCurrentTime(currentLocalTime);

          // Extract the hour part and set it as the displayed hour
          const currentHour = currentLocalTime.split(':')[0];
          setDisplayedHour(currentHour);

          // Find the index of the current hour in the API response
          const currentHourIndex = parseInt(currentHour, 10);

          // Get the corresponding wave height
          const currentWaveHeight = hourly.wave_height[currentHourIndex];

          setWaveHeight(currentWaveHeight);
        })
        .catch((error) => {
          console.error('Error fetching OpenMeteo data:', error);
        });
    }
  }, [lat, lng]);

  console.log('Wave Height:', waveHeight);
  console.log('Current Time:', currentTime);
  console.log('Timezone:', timezone);
  console.log('Displayed Hour:', displayedHour);

  return (
    <motion.div
      initial={{ scale: 0 }} // Initial scale set to 0
      animate={{ scale: 1 }} // Animate to scale 1
      exit={{ scale: 0 }} // Animate to scale 0 when exiting
    >
      <div id="p5-container">{timezone && (
        <h1>Current Time in {timezone}: {currentTime}</h1>
      )}
      {displayedHour !== null && waveHeight !== null && (
        <h2>Wave Height at {displayedHour}h: {waveHeight} meters</h2>
      )}</div>
    </motion.div>
  );
}
