require('dotenv').config();

import axios from 'axios';

const getGeocodeCoordinates = async (req, res) => {
  if (req.method === 'GET') {
    const { placeId } = req.query;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('Google Places API key is missing.');
      res.status(500).json({ error: 'Google Places API key is missing.' });
      return;
    }

    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await axios.get(endpoint);
      const results = response.data.results;

      if (results && results.length > 0) {
        const location = results[0].geometry.location;
        res.status(200).json(location);
      } else {
        console.error('No results found in the geocode response.');
        res.status(404).json({ error: 'No results found in the geocode response.' });
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      res.status(500).json({ error: 'An error occurred while fetching geocode data.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default getGeocodeCoordinates;
