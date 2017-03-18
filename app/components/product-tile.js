import Ember from 'ember';

export default Ember.Component.extend({
login: Ember.inject.service(),
  productFormShow: false,
  actions: {
    // update(product, params) {
    //   Object.keys(params).forEach(function(key) {
    //     if(params[key]!==undefined) {
    //       product.set(key,params[key]);
    //     }
    //     product.save();
    //   });
    // },

    destroyProduct(product) {
      debugger;
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
      var barcode = product.get('barcode');
      var name = product.get('name');
      var brand = product.get('brand');
      var description = product.get('description');
      var price = product.get('price');
      var image = product.get('image');
      var params = {
        barcode: this.get('barcode'),
        name: this.get('name'),
        brand: this.get('brand'),
        description: this.get('description'),
        price: this.get('price'),
        image: this.get('image')
      };
      console.log(params.barcode)
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
