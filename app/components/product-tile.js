import Ember from 'ember';

export default Ember.Component.extend({
  model() {
    return this.store.findAll('product');
},

  actions: {
    update(product, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          product.set(key,params[key]);
        }
        product.save();
      });
    },

    // saveProduct(params) {
    //   var newProduct = this.store.createRecord('product', params);
    //   newProduct.save();
    // },
  }
});
