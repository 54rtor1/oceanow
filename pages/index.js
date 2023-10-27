import Head from 'next/head';
import { useState } from 'react';
import Geolocation from '../components/Geolocation';
import LocationContent from '../components/LocationContent';
import CurrentData from '../components/CurrentData.jsx';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [locationData, setLocationData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLocationChange = (locationData) => {
    setLocationData(locationData);
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      router.push({
        pathname: '/current',
        query: {
          lat: locationData?.latitude,
          lng: locationData?.longitude,
        },
      });
    }
  };

  const handleGeolocationSuccess = (coords) => {
    setLocationData(coords);
    setShowConfirmation(true);
  };

  const handleGeolocationError = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden pt-20">
      <Head>
        <title>Oceanow</title>
      </Head>
      <div className="min-w-[50%] min-h-[50%] z-10">
        <Geolocation onGeolocationSuccess={handleGeolocationSuccess} onGeolocationError={handleGeolocationError} />
        {(showConfirmation || !locationData) && (
          <LocationContent
            locationData={locationData}
            onLocationChange={handleLocationChange}
            onConfirmation={handleConfirmation}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
