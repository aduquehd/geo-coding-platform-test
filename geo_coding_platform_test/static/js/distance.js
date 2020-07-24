let distanceMarker = {};
let distanceMap = null;


function initializeDistance() {
  distanceMap = L.map('distanceMap').setView([6.150096, -75.637175], 13);
  distanceMap.on('click', getDistanceMapOnClick);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(distanceMap);
}

function getDistanceMapOnClick(e) {
  let latitude, longitude;
  latitude = e.latlng.lat;
  longitude = e.latlng.lng;
  updateDistanceMap(latitude, longitude);

}

function updateDistanceMap(latitude, longitude) {
  let coordinates = [latitude, longitude];
  if (distanceMarker !== undefined) {
    distanceMap.removeLayer(distanceMarker);
  }
  distanceMarker = L.marker(coordinates, {icon: icon}).addTo(distanceMap);
  distanceMap.setView([latitude, longitude], 13);
}

function searchDistance(latitude1, longitude1, latitude2, longitude2) {
  let self = this;
  self.showDistanceValue = false;
  axios.get('/api/geocoding/get-distance/', {
    params: {
      latitude1,
      longitude1,
      latitude2,
      longitude2,
    }
  }).then(response => {
    console.log("Response: ", response);
    self.distanceValue = response.data.distance;
    self.showDistanceValue = true;
  })
}
