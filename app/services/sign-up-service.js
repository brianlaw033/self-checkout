import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  checkUsername(username, password, again, type){
    var self = this;
    var userInfo = this.get('store').query('user',{
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
                         newUser.save();
                         self.get("routing").transitionTo("index");
                       }else{
                         alert('Please select which type you are.');
                       };
                     } else {
                       alert('The 2 Password you entered does not match')
                     }
              }else {
                alert('Username Registered, Choose another name.')
              }
    })
  }
});
