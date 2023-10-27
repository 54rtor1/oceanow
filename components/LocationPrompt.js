import { useState } from 'react';
import LocationContent from './LocationContent';
import CurrentData from './CurrentData';

const LocationPrompt = ({ locationData, onLocationChange, onConfirmation }) => {
  const [showPrompt, setShowPrompt] = useState(!locationData);

  const handleConfirmation = (confirmed) => {
    setShowPrompt(false);
    onConfirmation(confirmed);
  };

  return (
    <div>
      {showPrompt ? (
        <LocationContent locationData={locationData} onLocationChange={onLocationChange} onConfirmation={handleConfirmation} />
      ) : (
        <CurrentData lat={locationData?.latitude} lng={locationData?.longitude} />
      )}
    </div>
  );
};

export default LocationPrompt;
