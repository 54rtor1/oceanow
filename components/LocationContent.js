// components/LocationContent.js
import LocationInput from './LocationInput';

const LocationContent = ({ locationData, onLocationChange, onConfirmation }) => {
  const handleConfirm = () => {
    onConfirmation(true);
  };

  const handleReject = () => {
    onConfirmation(false);
    onLocationChange(null); // Set locationData to null
  };

  return (
    <div className="wrapper p-8 text-center">
      {locationData ? (
        <div>
          <h1 className='title-quest'>Would you like to swim near {locationData.latitude}, {locationData.longitude}?</h1>
          <div>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleReject}>No</button>
          </div>
        </div>
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
