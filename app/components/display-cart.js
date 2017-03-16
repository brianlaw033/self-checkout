import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),
  login: Ember.inject.service(),
  actions:{
    addsoldItems(shoppingCart_Items){
      var login = this.get('login');
      console.log(login.userId);
      this.sendAction('addsoldItems',shoppingCart_Items, login.person);
    }
  }
});
