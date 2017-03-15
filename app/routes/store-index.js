import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.user_id);
  },
  actions: {
    update(shop, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          shop.set(key,params[key]);
        }
        shop.save();
      });
    },

    saveProduct(params) {
      var newProduct = this.store.createRecord('product', params);
      var shop = params.shop;
      shop.get('products').addObject(newProduct);
      newProduct.save().then(function () {
        return shop.get('_internalModel').save();
      });
    }
  }
});
