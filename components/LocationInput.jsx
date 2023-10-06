import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {Input} from "@nextui-org/react";
import {
  Listbox,
  ListboxSection,
  ListboxItem
} from "@nextui-org/react";


const LocationInput = ({ onLocationChange }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleLocationSelect = (selectedLocation) => {
    setInputValue(selectedLocation.description);

    // Extract place_id from the selected suggestion
    const placeId = selectedLocation.place_id;

    // Make an HTTP request to get the geocode coordinates
    axios
      .get(`/api/geocode?placeId=${placeId}`)
      .then((response) => {
        const { lat, lng } = response.data;

        // Pass the geocode coordinates to the parent component
        onLocationChange({ latitude: lat, longitude: lng });

        // Do not navigate to /oceanow, as per your requirement
      })
      .catch((error) => {
        console.error('Error fetching geocode data:', error);
      });

    setSuggestions([]);
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Make an HTTP request to fetch location suggestions
    axios
      .get(`/api/places?input=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        const data = response.data;

        const suggestions = data.predictions.map((prediction) => ({
          description: prediction.description,
          place_id: prediction.place_id,
        }));

        setSuggestions(suggestions);
      })
      .catch((error) => {
        console.error('Error fetching location suggestions:', error);
        setSuggestions([]);
      });
  }, [inputValue]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter your location"
        variant="underlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="box-suggestions">
       <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
        >
        {suggestions.map((suggestion, index) => (
          <ListboxItem key={index} onClick={() => handleLocationSelect(suggestion)}>
            {suggestion.description}
          </ListboxItem>
        ))}
        </Listbox>
      </div>
    </div>
  );
};

export default LocationInput;
