import { useState } from 'react';

const LocationConfirmation = ({ onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h1 className="title-quest">Is this the correct location?</h1>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleCancel}>No</button>
    </div>
  );
};

export default LocationConfirmation;
