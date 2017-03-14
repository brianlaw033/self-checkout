import Ember from 'ember';

export default Ember.Component.extend({
login: Ember.inject.service(),
  actions: {
    update(product, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          product.set(key,params[key]);
        }
        product.save();
      });
    },

    destroyProduct(product) {
        if (confirm('Are you sure you want to delete this product record?')) {
          return product.destroyRecord('product');
      }
    }
  }
});
