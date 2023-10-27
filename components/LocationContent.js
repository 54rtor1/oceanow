import LocationInput from './LocationInput';

const LocationContent = ({ locationData, onLocationChange }) => {
  return (
    <div className="wrapper">
      {locationData ? (
        <h1 className='title-quest'>Would you like to swim near {locationData.latitude}, {locationData.longitude}?</h1>
      ) : (
        <div>
          <h1 className='title-quest'>Where would you like to swim?</h1>
          <LocationInput onLocationChange={onLocationChange} />
        </div>
      )}
    </div>
  );
};

export default LocationContent;
