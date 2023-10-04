import Head from 'next/head';
import LocationInput from '../components/LocationInput';

const Home = () => {
  const handleLocationChange = (locationData) => {
    // Handle the location data, e.g., update state or make API requests
    console.log('Location Data:', locationData);
  };

  return (
    <div>
      <Head>
        <title>Next.js Landing Page with p5.js Animation</title>
      </Head>
      <h1>Next.js Landing Page with p5.js Animation</h1>
      <LocationInput onLocationChange={handleLocationChange} />
    </div>
  );
};

export default Home;
