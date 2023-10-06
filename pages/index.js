
import Head from 'next/head';
import LocationInput from '../components/LocationInput';
import ImageTrail from '../components/ImageTrail';
import { useEffect, useState } from 'react';
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

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden pt-20">
      <Head>
        <title>Oceanow</title>
      </Head>
      <ImageTrail style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      <div className="min-w-[50%] min-h-[50%] z-10">
        <div className="wrapper">
          <h1 className='title-quest'>Where would you like to swim?</h1>
          <LocationInput onLocationChange={handleLocationChange} />
        </div>
      </div>
      {showOceanow && <OceanowComponent lat={locationData?.latitude} lng={locationData?.longitude} onClose={removeOceanowComponent} />}
    </div>
  );
};

export default Home;
