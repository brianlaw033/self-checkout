import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),
  login: Ember.inject.service(),
  actions:{
    addsoldItems(shoppingCart_Items,products){
      var login = this.get('login');
      this.get('login').checkCreditCard();
      var hasCreditCard = this.get('login').hasCreditCard;
      if(hasCreditCard){
        this.sendAction('addsoldItems',shoppingCart_Items, login.person);
        this.get('shoppingCart').clearCart();
      }
    }
  }
});
