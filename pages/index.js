import Head from 'next/head';
import LocationInput from '../components/LocationInput';
import ImageGrid from '../components/ImageGrid';

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
      <ImageGrid style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      <div className='min-w-[50%] min-h-[50%] z-10'>
        <h1 className='font-serif title-quest'>Where would you like to swim?</h1>
        <LocationInput onLocationChange={handleLocationChange} />
      </div>
    </div>
  );
};

export default Home;
