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
  LatLng(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  }
});
