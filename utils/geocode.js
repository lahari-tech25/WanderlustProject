const axios = require('axios');

const geocodeLocation = async (location) => {
  try {
    const apiKey = process.env.MAP_TOKEN;
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data && response.data.features.length > 0) {
      const coordinates = response.data.features[0].geometry.coordinates;
      return coordinates; // [longitude, latitude]
    } else {
      throw new Error('Location not found');
    }
  } catch (err) {
    console.error("Geocoding error:", err.message);
    return null;
  }
};

module.exports = geocodeLocation;
