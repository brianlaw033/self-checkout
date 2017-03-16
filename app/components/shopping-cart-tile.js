import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),

  // itemPrice : +((this.get('item').price).toFixed(2)),

  actions: {
    removeItem(item) {
      this.get('shoppingCart').remove(item);
    },
    addItem(item) {
      this.get('shoppingCart').add(item);
    }
  }
});
