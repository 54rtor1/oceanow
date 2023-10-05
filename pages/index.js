import Head from 'next/head';
import LocationInput from '../components/LocationInput';
import ImageTrail from '../components/ImageTrail';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
  const handleLocationChange = (locationData) => {
    // Handle the location data, e.g., update state or make API requests
    console.log('Location Data:', locationData);
  };

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden pt-20">
      <Head>
        <title>Oceanow</title>
      </Head>
      <AnimatePresence exitBeforeEnter={false}>
        <ImageTrail
          key="imageTrail" // Ensure a unique key when animating
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        />
      </AnimatePresence>
      <div className="min-w-[50%] min-h-[50%] z-10">
        <div className="wrapper">
        <h1 className='title-quest'>Where would you like to swim?</h1>
        <LocationInput onLocationChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );

};

export default Home;
