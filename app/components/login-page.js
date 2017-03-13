import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  actions:{
    userLogin(){
        var username =  this.get('username');
        var password =  this.get('password');
        return this.get('login').checkType(username, password);
    }
  }
});
