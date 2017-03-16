import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,
  initMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  addMarker(markerInfo) {
    return new this.googleMaps.Marker(markerInfo);
  },
  geocodeAddress() {
    return new this.googleMaps.Geocoder();
  },
  infoWindow(selectedMapParam) {
    return new this.googleMaps.InfoWindow(selectedMapParam);
  },
  DistMatrix() {
    return new this.googleMaps.DistanceMatrixService;
  },

  fifty_meter_shops: [],

  getClosestShops(origin, shops) {

    //get the distance matrix
    service.getDistanceMatrix({
      origins: [origin],
      destinations: locations,
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var results = response.rows[0].elements;
        for (var j = 0; j < results.length; j++) {
          distance_text[j] = String(results[j].distance.text);
        }
      }
    });
  }

});
