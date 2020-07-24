$(document).ready(function () {

  var app = new Vue({
    el: '#app',
    data: {
      show_geocoding: true,
      show_reverse_geocoding: true,
      show_distance: true,
      geocodeLatitude: null,
      geocodeLongitude: null,
      geocodeFormattedAddress: null,
      showGeocodingFormattedAddress: false,
      reverseGeocodeAddress: null,
      showReverseGeocodingCoordinates: false,
      reverseGeocodeLatitude: null,
      reverseGeocodeLongitude: null,
      distanceLatitude1: null,
      distanceLongitude1: null,
      distanceLatitude2: null,
      distanceLongitude2: null,
      showDistanceValue: null,
      distanceValue: null,
    },
    mounted: function () {
      initializeGeocode();
      initializeReverseGeocode();
      this.show_geocoding = false;
      this.show_reverse_geocoding = false;
      this.show_distance = false;
    },
    methods: {
      showGeocoding: function () {
        this.show_geocoding = true;
        this.show_reverse_geocoding = false;
        this.show_distance = false;
      },
      showReverseGeocoding: function () {
        this.show_geocoding = false;
        this.show_reverse_geocoding = true;
        this.show_distance = false;
      },
      showDistance: function () {
        this.show_geocoding = false;
        this.show_reverse_geocoding = false;
        this.show_distance = true;
      },
      searchGeocodeAction: function () {
        searchGeocode.call(this, this.geocodeLatitude, this.geocodeLongitude);
      },
      searchReverseGeocodeAction: function () {
        searchReverseGeocode.call(this, this.reverseGeocodeAddress);
      },
      searchDistanceAction: function () {
        searchDistance.call(
          this,
          this.distanceLatitude1,
          this.distanceLongitude1,
          this.distanceLatitude2,
          this.distanceLongitude2
        );
      }
    }
  });

})
