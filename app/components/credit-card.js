import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  shoppingCart: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('card', params.user_id);
    return this.store.findRecord('customer', login.user_id);
  },

  actions: {
    saveCard (user) {
      var customerObject = user.get('customer');
      var customerId = customerObject;
      var params = {
        fullname: this.get('fullname'),
        number: this.get('number'),
        date: this.get('date'),
        security: this.get('security'),
        customer: customerId
      };
      this.sendAction('saveCard', params);
      this.send('addsoldItems', this.get('shoppingCart').items);
    },
    addsoldItems(shoppingCart_Items){
      debugger;
      var login = this.get('login');
      this.sendAction('addsoldItems',shoppingCart_Items, login.person);
      this.get('shoppingCart').clearCart();
    }
  }
});
