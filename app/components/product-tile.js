import Ember from 'ember';

export default Ember.Component.extend({
login: Ember.inject.service(),
  productFormShow: false,
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
    },
    productFormShow() {
      if(this.get('productFormShow')==false){
        this.set('productFormShow', true);
      }else{
        this.set('productFormShow', false);
      }
    },
    update(product) {
      var params = {
        barcode: this.get('controller.barcode'),
        name: this.get('controller.name'),
        brand: this.get('controller.brand'),
        description: this.get('controller.description'),
        price: this.get('controller.price'),
        image: this.get('controller.image')
      };
      this.set('productFormShow', false);
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          product.set(key,params[key]);
        }
        product.save();
      });
    }
  }
});
