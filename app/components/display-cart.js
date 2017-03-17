import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),
  login: Ember.inject.service(),
  actions:{
    addsoldItems(shoppingCart_Items){
      var login = this.get('login');
      this.get('login').checkCreditCard();
      var hasCreditCard = this.get('login').hasCreditCard;
      debugger;
      console.log(hasCreditCard);
      if(hasCreditCard){
        this.get('shoppingCart').clearCart();
        this.sendAction('addsoldItems',shoppingCart_Items, login.person);
      }
    }
  }
});
