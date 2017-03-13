import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.user_id);
  },
  actions: {
    saveProduct(params) {
      var newProduct = this.store.createRecord('product', params);
      var shop = params.shop;
      shop.get('products').addObject(newProduct);
      newProduct.save().then(function (shop) {
        return shop.save();
      });
    },
  }
});
