import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),

  var itemPrice2 = +((price / listprice).toFixed(2));
  var itemPrice = parseInt(itemPrice2);

  actions: {
    removeItem(item) {
      this.get('shoppingCart').remove(item);
    },
    addItem(item) {
      this.get('shoppingCart').add(item);
    }
  }
});
