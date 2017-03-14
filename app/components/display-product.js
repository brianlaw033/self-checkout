import Ember from 'ember';

export default Ember.Component.extend({
  findProduct: Ember.inject.service(),
  login: Ember.inject.service(),
  shoppingCart: Ember.inject.service(),
  actions:{
    getBarcode(params){
        var tempNum = this.get('barcode');
        this.get('findProduct').getProduct(tempNum, params);
        // this.toggleProperty('isShowingModal');
    },
    addToCart(item) {
      this.get('shoppingCart').add(item);
    },

    logout(){
      this.get('login').logout();
    },

    toggleModal() {
      this.get('findProduct').toggleModal();
    }
  }
});
