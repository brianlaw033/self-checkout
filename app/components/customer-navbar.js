import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  actions:{
    logout(){
      this.get('login').logout();
    },
  }
});
