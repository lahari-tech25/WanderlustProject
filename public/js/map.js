
  const map = new maplibregl.Map({
  container: 'map',
  style: `https://api.maptiler.com/maps/streets/style.json?key=${window.MAP_TOKEN}`,
  center: listingCoordinates, // Replace with your listing's coordinates if available
  zoom: 12
});

map.addControl(new maplibregl.NavigationControl());

new maplibregl.Marker()
  .setLngLat(listingCoordinates)
  .setPopup(new maplibregl.Popup().setText('Listing Location')) // Optional
  .addTo(map);
