import Head from 'next/head';
import ImageTrail from '../components/ImageTrail';
import { useState } from 'react';
import Geolocation from '../components/Geolocation';
import LocationContent from '../components/LocationContent';
import OceanowComponent from '../components/OceanowComponent.jsx';

const Home = () => {
  const [locationData, setLocationData] = useState(null);
  const [showOceanow, setShowOceanow] = useState(false);

  const handleLocationChange = (locationData) => {
    setLocationData(locationData);
    setShowOceanow(true);
  };

  const removeOceanowComponent = () => {
    setShowOceanow(false);
  };

  const handleGeolocationSuccess = (coords) => {
    setLocationData(coords);
    setShowOceanow(true);
  };

  const handleGeolocationError = () => {
    // add handle error
  };

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden pt-20">
      <Head>
        <title>Oceanow</title>
      </Head>
      {/* <ImageTrail style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} /> */}
      <div className="min-w-[50%] min-h-[50%] z-10">
        <Geolocation onGeolocationSuccess={handleGeolocationSuccess} onGeolocationError={handleGeolocationError} />
        <LocationContent locationData={locationData} onLocationChange={handleLocationChange} />
      </div>
      {showOceanow && <OceanowComponent lat={locationData?.latitude} lng={locationData?.longitude} onClose={removeOceanowComponent} />}
    </div>
  );
};

export default Home;
