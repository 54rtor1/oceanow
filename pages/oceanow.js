import { useEffect, useState } from 'react';
import p5 from 'p5';
import { sketch } from '../public/animation'; // Import your sketch function
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AnimationPage() {
  const router = useRouter();
  const { lat, lng } = router.query;
  const [waveHeight, setWaveHeight] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [displayedHour, setDisplayedHour] = useState(null);

  useEffect(() => {
    const container = document.getElementById('p5-container');

    // Create a p5.js instance and attach it to the container element
    new p5(sketch, container);

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

  return (
    <div>
      <div id="p5-container"></div>
      {timezone && (
        <h1>Current Time in {timezone}: {currentTime}</h1>
      )}
      {displayedHour !== null && waveHeight !== null && (
        <h2>Wave Height at {displayedHour}h: {waveHeight} meters</h2>
      )}
    </div>
  );
}
