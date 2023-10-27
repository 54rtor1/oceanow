// pages/index.jsx
import Head from 'next/head';
import ImageTrail from '../components/ui/ImageTrail';
import { useState } from 'react';
import Geolocation from '../components/Geolocation';
import LocationContent from '../components/LocationContent';
import CurrentData from '../components/CurrentData.jsx';

const Home = () => {
  const [locationData, setLocationData] = useState(null);
  const [showOceanow, setShowOceanow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLocationChange = (locationData) => {
    setLocationData(locationData);
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      setShowOceanow(true);
    }
  };

  const removeCurrentData = () => {
    setShowOceanow(false);
  };

  const handleGeolocationSuccess = (coords) => {
    setLocationData(coords);
    setShowConfirmation(true); // Automatically show confirmation on GPS permission
  };

  const handleGeolocationError = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden pt-20">
      <Head>
        <title>Oceanow</title>
      </Head>
      {/* <ImageTrail style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} /> */}
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
      {showOceanow && <CurrentData lat={locationData?.latitude} lng={locationData?.longitude} onClose={removeCurrentData} />}
    </div>
  );
};

export default Home;
