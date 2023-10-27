import { useEffect, useState } from 'react';

const Geolocation = ({ onGeolocationSuccess, onGeolocationError }) => {
  useEffect(() => {
    if (navigator.geolocation) {
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
    }
  }, [onGeolocationSuccess, onGeolocationError]);

  return null;
};

export default Geolocation;
