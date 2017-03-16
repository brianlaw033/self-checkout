import Ember from 'ember';

export default Ember.Component.extend({
  findProduct: Ember.inject.service(),
  login: Ember.inject.service(),
  shoppingCart: Ember.inject.service(),
  priceComparison: Ember.inject.service(),
  actions:{
    getBarcode(params){
        var tempNum = this.get('barcode');
        this.set('barcode', "");
        this.get('findProduct').getProduct(tempNum, params);
        this.get('priceComparison').getProduct(tempNum, params);
        // this.toggleProperty('isShowingModal');
    },
    addToCart(item) {
      this.get('shoppingCart').add(item);
      this.get('findProduct').toggleModal();
    },
    toggleModal() {
      this.get('findProduct').toggleModal();
    }
  }
});
