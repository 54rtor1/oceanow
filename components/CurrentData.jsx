import { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentData = ({ lat, lng }) => {
  const [waveHeight, setWaveHeight] = useState(null);
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    if (lat && lng) {
      axios
        .get(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height&timezone=auto`
        )
        .then((response) => {
          const { timezone, hourly } = response.data;
          setTimezone(timezone);

          // Assuming you want to display the current wave height (you can modify this part)
          const currentHour = new Date().getHours();
          const currentWaveHeight = hourly.wave_height[currentHour];
          setWaveHeight(currentWaveHeight);
        })
        .catch((error) => {
          console.error('Error fetching OpenMeteo data:', error);
        });
    }
  }, [lat, lng]);

  return (
    <div>
      {timezone && <h1>Current Time in {timezone}: {new Date().toLocaleTimeString('en-US', { timeZone: timezone })}</h1>}
      {waveHeight !== null && (
        <h2>Current Wave Height: {waveHeight} meters</h2>
      )}
    </div>
  );
};

export default CurrentData;
