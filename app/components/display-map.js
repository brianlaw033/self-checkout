import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  // requiredMap: null,
  // origin: null,
  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      var fifty_meter_shops = this.get('map').fifty_meter_shops;
      this.set('fifty_meter_shops', []);
      var kilo_meter_shops = this.get('map').kilo_meter_shops;
      this.set('kilo_meter_shops', []);

      this.send("showMap");
    });
  },

  actions: {
    showMap: function () {
      var map = this.get('map');
      map.set('fifty_meter_shops', []);
      map.set('kilo_meter_shops', []);

      //creating a new map
      var self = this;
      var container = this.$('#the-map')[0];
      var defaultLocation = {lat: 22.288800, lng: 114.171386};
      var options = {
        center: defaultLocation,
        zoom: 15
      };
      this.get('map').initMap(container, options);
      var requiredMap = this.get('map').initMap(container, options);

      // this.set('requiredMap', this.get('map').initMap(container, options));
      // var requiredMap = this.get('requiredMap');
      this.get('map').storeMapInService(requiredMap);
      var param = {map: requiredMap};
      var infoWindow = this.get('map').infoWindow(param);

      //locating our user
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        var requiredMap = this.get('map').requiredMap; //this line is necessary for solving the scoping problem
        navigator.geolocation.getCurrentPosition(function(position) {
          //setting origin
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.get('map').setOrigin(pos);

          //add 'You are here'
          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here. ');
          requiredMap.setCenter(pos);

          //auto show closest shops
          var shops = self.get('shops');
          shops.forEach(function (shop) {
            var location = shop.get('location');
            var geocoder = self.get('map').geocodeAddress();
            geocoder.geocode({'address': location+", hong kong"}, function(results, status) {
              if (status === 'OK') {
                var destination = results[0].geometry.location;

                //add Marker for each shop
                var requiredMap = self.get('map').requiredMap;
                var markerInfo = {
                  position: destination,
                  map: requiredMap
                };
                self.get('map').addMarker(markerInfo);

                //get the distance matrix
                var origin = self.get('map').origin;
                var service = self.get('map').DistMatrix();
                service.getDistanceMatrix({
                  origins: [origin],
                  destinations: [destination],
                  travelMode: 'WALKING',
                  unitSystem: google.maps.UnitSystem.METRIC,
                  avoidHighways: false,
                  avoidTolls: false
                }, function(response, status) {
                  if (status !== 'OK') {
                    alert('Error was: ' + status);
                  } else {
                    var result = response.rows[0].elements[0];
                    if (result.distance.value < 50) {
                      var fifty_meter_shops = self.get('map').fifty_meter_shops;
                      fifty_meter_shops.pushObject(shop);
                    } else if (result.distance.value < 1000) {
                        var kilo_meter_shops = self.get('map').kilo_meter_shops;
                        kilo_meter_shops.pushObject(shop);
                    }
                  }
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          });
        }, function() {
          handleLocationError(true, infoWindow, requiredMap.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        var requiredMap = self.get('map').requiredMap;
        handleLocationError(false, infoWindow, requiredMap.getCenter());
      };
      var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      };
    },

    geocodeAddress() {
      var map = this.get('map');
      map.set('fifty_meter_shops', []);
      map.set('kilo_meter_shops', []);

      var self = this;
      var geocoder = this.get('map').geocodeAddress();
      var address = this.get('address');
      // var requiredMap = this.get('requiredMap');
      var map = this.get('map');
      geocoder.geocode({'address': address+", hong kong"}, function(results, status) {
        if (status === 'OK') {
          //setting origin
          var requiredMap = self.get('map').requiredMap;
          requiredMap.setCenter(results[0].geometry.location);
          self.get('map').setOrigin(results[0].geometry.location);
          // self.set('origin', results[0].geometry.location);

          //adding 'user LatLng'
          var param = {map: requiredMap};
          var infoWindow = map.infoWindow(param);
          infoWindow.setPosition(results[0].geometry.location);
          infoWindow.setContent('Your search result.');
          // infoWindow.setContent(String(results[0].geometry.location));

          //auto show closest shop
          var shops = self.get('shops');
          var fifty_meter_shops = self.get('map').fifty_meter_shops;
          shops.forEach(function (shop) {
            var location = shop.get('location');
            var geocoder = self.get('map').geocodeAddress();
            geocoder.geocode({'address': location+", hong kong"}, function(results, status) {
              if (status === 'OK') {
                var destination = results[0].geometry.location;
                //get the distance matrix
                var origin = self.get('map').origin;
                var service = self.get('map').DistMatrix();
                service.getDistanceMatrix({
                  origins: [origin],
                  destinations: [destination],
                  travelMode: 'WALKING',
                  unitSystem: google.maps.UnitSystem.METRIC,
                  avoidHighways: false,
                  avoidTolls: false
                }, function(response, status) {
                  if (status !== 'OK') {
                    alert('Error was: ' + status);
                  } else {
                    var result = response.rows[0].elements[0];
                    if (result.distance.value < 50) {
                      var fifty_meter_shops = self.get('map').fifty_meter_shops;
                      fifty_meter_shops.pushObject(shop);
                    } else if (result.distance.value < 1000) {
                        var kilo_meter_shops = self.get('map').kilo_meter_shops;
                        kilo_meter_shops.pushObject(shop);
                    }
                  }
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    },
    myLocation() {
      var map = this.get('map');
      map.set('fifty_meter_shops', []);
      map.set('kilo_meter_shops', []);

      var self = this;
      // var requiredMap = this.get('requiredMap');
      // var requiredMap = this.get('map').requiredMap;
      // var param = {map: requiredMap};
      // var infoWindow = this.get('map').infoWindow(param);

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.get('map').setOrigin(pos);

          var requiredMap = self.get('map').requiredMap;
          var param = {map: requiredMap};
          var infoWindow = self.get('map').infoWindow(param);
          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here now.');
          requiredMap.setCenter(pos);

          //auto show closest shops
          var shops = self.get('shops');
          shops.forEach(function (shop) {
            var location = shop.get('location');
            var geocoder = self.get('map').geocodeAddress();
            geocoder.geocode({'address': location+", hong kong"}, function(results, status) {
              if (status === 'OK') {
                var destination = results[0].geometry.location;

                //add Marker for each shop
                var requiredMap = self.get('map').requiredMap;
                var markerInfo = {
                  position: destination,
                  map: requiredMap
                };
                self.get('map').addMarker(markerInfo);

                //get the distance matrix
                var origin = self.get('map').origin;
                var service = self.get('map').DistMatrix();
                service.getDistanceMatrix({
                  origins: [origin],
                  destinations: [destination],
                  travelMode: 'WALKING',
                  unitSystem: google.maps.UnitSystem.METRIC,
                  avoidHighways: false,
                  avoidTolls: false
                }, function(response, status) {
                  if (status !== 'OK') {
                    alert('Error was: ' + status);
                  } else {
                    var result = response.rows[0].elements[0];
                    if (result.distance.value < 50) {
                      var fifty_meter_shops = self.get('map').fifty_meter_shops;
                      fifty_meter_shops.pushObject(shop);
                    } else if (result.distance.value < 1000) {
                        var kilo_meter_shops = self.get('map').kilo_meter_shops;
                        kilo_meter_shops.pushObject(shop);
                    }
                  }
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          });
        }, function() {
          handleLocationError(true, infoWindow, requiredMap.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        var requiredMap = self.get('map').requiredMap;
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
