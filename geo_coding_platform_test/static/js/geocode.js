let geocodeMarker = {};
let geocodeMap = null;
let icon = L.icon({
  iconUrl: '/static/images/marker-icon-2x-green.png',
  iconSize: [18, 26],
  iconAnchor: [10, 9]
});

function initializeGeocode() {
  geocodeMap = L.map('geocodeMap').setView([6.150096, -75.637175], 13);
  geocodeMap.on('click', getGeocodeMapOnClick);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(geocodeMap);
}

function getGeocodeMapOnClick(e) {
  let latitude, longitude;
  latitude = e.latlng.lat;
  longitude = e.latlng.lng;
  updateGeocodeMap(latitude, longitude);

}

function updateGeocodeMap(latitude, longitude) {
  let coordinates = [latitude, longitude];
  if (geocodeMarker !== undefined) {
    geocodeMap.removeLayer(geocodeMarker);
  }
  geocodeMarker = L.marker(coordinates, {icon: icon}).addTo(geocodeMap);
  geocodeMap.setView([latitude, longitude], 13);
}

function searchGeocode(latitude, longitude) {
  let self = this;
  self.showGeocodingFormattedAddress = false;
  axios.get('/api/geocoding/get-geocode/', {
    params: {
      latitude: latitude,
      longitude: longitude
    }
  }).then(response => {
    console.log("Response: ", response);
    self.geocodeFormattedAddress = response.data.data.results[0].formatted_address;
    self.showGeocodingFormattedAddress = true;
    updateGeocodeMap(latitude, longitude);
  })
}
