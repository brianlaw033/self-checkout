import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  seller: false,
  b4Submit: true,
  tempUsername: "",
  checkUsername(username, password, again, type){
    var self = this;
    return this.get('store').query('user',{
      orderBy: 'username',
      equalTo:  username
    }).then(function(users){
              if(users.get('firstObject') == null){
                     if( password === again ){
                       if(type != null){
                         var params = {
                           username: username,
                           password: password,
                           type: type
                         };
                         var newUser = self.get('store').createRecord('user', params);
                         newUser.save().then(function(){
                           self.set('b4Submit', false);
                           return self.get('store').query('user',{
                             orderBy: 'username',
                             equalTo:  self.get('tempUsername')
                           }).then(function(users){
                             var user = users.get('firstObject');
                             if(type == 'customer'){
                               var params = {
                                 user: user
                               }
                               var newCustomer = self.get('store').createRecord('customer', params);
                               var tempUser = params.user;
                               tempUser.set('customer',newCustomer);
                               newCustomer.save().then(function(){
                                 return tempUser.save();
                               });
                             }
                           })
                       })
                         if(type != 'seller'){
                           self.set('customer', true);
                           self.set('tempUsername', username);
                           self.set('b4Submit', false);
                           self.get("routing").transitionTo("index");
                         }else{
                           self.set('seller', true);
                           self.set('tempUsername', username);
                           self.get("routing").transitionTo("sign-up");
                         }

                       }else{
                         alert('Please select which type you are.');
                       }
                     } else {
                       alert('The 2 Password you entered does not match');
                     }
              }else {
                alert('Username Registered, Choose another name.');
              }
    });
  },

  addShop(shopname, location, photo, logo){
    var self = this;
    return this.get('store').query('user',{
      orderBy: 'username',
      equalTo:  this.get('tempUsername')
    }).then(function(users){
      var user = users.get('firstObject');
      var params = {
        shopname: shopname,
        promotion: null,
        description: null,
        photo: photo,
        logo: logo,
        location: location,
        user: user
      }
      var newShop = self.get('store').createRecord('shop', params);
      var tempUser = params.user;
      tempUser.set('shop',newShop);
      newShop.save().then(function(){
        return tempUser.save();
      });
      self.set('b4Submit', false);
      self.get("routing").transitionTo("index");
    })
  },

  // // addCustomer(){
  // //   var self = this;
  //   return this.get('store').query('user',{
  //     orderBy: 'username',
  //     equalTo:  this.get('tempUsername')
  //   }).then(function(users){
  //     var user = users.get('firstObject');
  //     var params = {
  //       user: user
  //     }
  //     var newCustomer = self.get('store').createRecord('customer', params);
  //     var tempUser = params.user;
  //     tempUser.set('customer',newCustomer);
  //     newCustomer.save().then(function(){
  //       return tempUser.save();
  //     });
  //     self.get("routing").transitionTo("index");
  //   })
  // // }

});
