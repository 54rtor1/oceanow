import Head from 'next/head';
import LocationInput from '../components/LocationInput';

const Home = () => {
  const handleLocationChange = (locationData) => {
    // Handle the location data, e.g., update state or make API requests
    console.log('Location Data:', locationData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>Oceanow</title>
      </Head>
      <div className='min-w-[50%] min-h-[50%]'>
      <h1 className='font-serif title-quest'>Where would you like to swim?</h1>
        <LocationInput onLocationChange={handleLocationChange} />
      </div>
    </div>
  );
};

export default Home;
