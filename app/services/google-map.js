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
  requiredMap: null,
  storeMapInService(map){
    this.set('requiredMap', map);
  },
  origin: null,
  setOrigin(origin){
    this.set('origin', origin);
  },
  fifty_meter_shops: [],
  kilo_meter_shops: [],

});
