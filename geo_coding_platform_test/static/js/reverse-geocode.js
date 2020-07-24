let reverseGeocodeMarker = {};
let reverseGeocodeMap = null;

function initializeReverseGeocode() {
  reverseGeocodeMap = L.map('reverseGeocodeMap').setView([6.150096, -75.637175], 13);
  reverseGeocodeMap.on('click', getReverseGeocodeMapOnClick);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(reverseGeocodeMap);
}

function getReverseGeocodeMapOnClick(e) {
  let latitude, longitude;
  latitude = e.latlng.lat;
  longitude = e.latlng.lng;
  updatedReverseGeocodeMap(latitude, longitude);

}

function updatedReverseGeocodeMap(latitude, longitude) {
  let coordinates = [latitude, longitude];
  if (reverseGeocodeMarker !== undefined) {
    reverseGeocodeMap.removeLayer(reverseGeocodeMarker);
  }
  reverseGeocodeMarker = L.marker(coordinates, {icon: icon}).addTo(reverseGeocodeMap);
  reverseGeocodeMap.setView([latitude, longitude], 13);
}

function searchReverseGeocode(address) {
  let self = this;
  self.showReverseGeocodingCoordinates = false;
  axios.get('/api/geocoding/get-geocode/', {
    params: {
      address,
    }
  }).then(response => {
    console.log("Data: ", response)
    let latitude = response.data.data.results[0].geometry.location.lat;
    let longitude = response.data.data.results[0].geometry.location.lng;
    self.reverseGeocodeLatitude = latitude;
    self.reverseGeocodeLongitude = longitude;
    self.showReverseGeocodingCoordinates = true;
    updatedReverseGeocodeMap(latitude, longitude);
  })
}
