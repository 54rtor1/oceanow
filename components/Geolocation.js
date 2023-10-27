import { useEffect, useState } from 'react';

const Geolocation = ({ onGeolocationSuccess, onGeolocationError }) => {
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    if (navigator.geolocation && !hasRequested) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocationSuccess({ latitude, longitude });
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          onGeolocationError();
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );

      setHasRequested(true);
    }
  }, [hasRequested, onGeolocationSuccess, onGeolocationError]);

  return null;
};

export default Geolocation;
