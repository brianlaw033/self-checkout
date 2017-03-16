import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  locations: null,
  requiredMap: null,
  origin: null,
  results: null,
  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      this.send("showMap");
    });
  },
  actions: {
    showMap: function () {
      //creating a new map
      var self = this;
      var container = this.$('#the-map')[0];
      var defaultLocation = {lat: 22.288800, lng: 114.171386};
      var options = {
        center: defaultLocation,
        zoom: 15
      };
      this.set('requiredMap', this.get('map').initMap(container, options));
      var requiredMap = this.get('requiredMap');
      var param = {map: requiredMap};
      var infoWindow = this.get('map').infoWindow(param);
      // //locating our user
      // // Try HTML5 geolocation.
      // if (navigator.geolocation) {
      //   var requiredMap = this.get('requiredMap'); //this line is necessary for solving the scoping problem
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     var pos = {
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude
      //     };
      //     self.set('origin', pos);
      //     infoWindow.setPosition(pos);
      //     infoWindow.setContent('You are here. ');
      //     requiredMap.setCenter(pos);
      //   }, function() {
      //     handleLocationError(true, infoWindow, requiredMap.getCenter());
      //   });
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleLocationError(false, infoWindow, requiredMap.getCenter());
      // };
      // var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent(browserHasGeolocation ?
      //                         'Error: The Geolocation service failed.' :
      //                         'Error: Your browser doesn\'t support geolocation.');
      // };
      //
      //
      // //adding markers for the stores
      // var map = this.get('map');
      // var requiredMap = this.get('requiredMap');
      // var locations = [
      //   {lat: 22.315037, lng: 114.189587},
      //   {lat: 22.313630, lng: 114.185763},
      //   {lat: 22.312061, lng: 114.189314},
      //   {lat: 22.309151, lng: 114.188624},
      //   {lat: 22.309391, lng: 114.191396},
      //   {lat: 22.308605, lng: 114.189800},
      //   {lat: 22.307778, lng: 114.184810},
      //   {lat: 22.307498, lng: 114.186226},
      //   {lat: 22.307066, lng: 114.186114},
      //   {lat: 22.278106, lng: 114.170497},
      //   {lat: 22.278079, lng: 114.171006},
      //   {lat: 22.277100, lng: 114.170513},
      //   {lat: 22.276903, lng: 114.168803},
      //   {lat: 22.276031, lng: 114.170348},
      //   {lat: 22.277612, lng: 114.171957}
      // ];
      // this.set('locations', locations);
      // locations.map(function(location, i) {
      //   // var param = {map: requiredMap};
      //   // var infoWindow = map.infoWindow(param);
      //   // infoWindow.setPosition(location);
      //   // infoWindow.setContent(String(i));
      //   var markerInfo = {
      //     position: location,
      //     map: requiredMap
      //   };
      //   map.addMarker(markerInfo);
      // });
    },
    getClosestShops(shops){
      var origin = this.get('origin');
      this.get('map').getClosestShops(origin, shops);
    },
    geocodeAddress() {
      var geocoder = this.get('map').geocodeAddress();
      var address = this.get('address');
      var requiredMap = this.get('requiredMap');
      var map = this.get('map');
      geocoder.geocode({'address': address+", hong kong"}, function(results, status) {
        if (status === 'OK') {
          requiredMap.setCenter(results[0].geometry.location);
          // var markerInfo = {
          //   position: results[0].geometry.location,
          //   map: requiredMap
          // };
          // map.addMarker(markerInfo);
          var param = {map: requiredMap};
          var infoWindow = map.infoWindow(param);
          infoWindow.setPosition(results[0].geometry.location);
          infoWindow.setContent(String(results[0].geometry.location));
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    },
    myLocation() {
      var requiredMap = this.get('requiredMap');
      var param = {map: requiredMap};
      var infoWindow = this.get('map').infoWindow(param);

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here.');
          requiredMap.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, requiredMap.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, requiredMap.getCenter());
      };

      var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      };
    }
  }
});
