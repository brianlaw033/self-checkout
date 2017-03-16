import Ember from 'ember';

export default Ember.Component.extend({
  addNewProduct: false,
  login: Ember.inject.service(),
  actions: {
    productFormShow () {
      this.set('addNewProduct', true);
    },
    saveProduct () {
      var params = {
        barcode: parseInt(this.get('barcode')),
        brand: this.get('brand'),
        description: this.get('description'),
        image: this.get('image'),
        name: this.get('name'),
        price: this.get('price'),
        quantity_selected: 0,
        shop: this.get('shop')
      };
      this.set('addNewProduct', false);
      this.sendAction('saveProduct', params);
    }
  }
});
