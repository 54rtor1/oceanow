require('dotenv').config();

import axios from 'axios';

const getGooglePlacesSuggestions = async (req, res) => {
  if (req.method === 'GET') {
    const { input } = req.query;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('Google Places API key is missing.');
      res.status(500).json({ error: 'Google Places API key is missing.' });
      return;
    }

    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}&types=geocode`;

    try {
      const response = await axios.get(endpoint);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      res.status(500).json({ error: 'An error occurred while fetching suggestions.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default getGooglePlacesSuggestions;
