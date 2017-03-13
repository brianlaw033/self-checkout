import Ember from 'ember';

export default Ember.Component.extend({
  findProduct: Ember.inject.service(),
  login: Ember.inject.service(),
  shoppingCart: Ember.inject.service(),
  actions:{
    getBarcode(){
        var tempNum = this.get('barcode');
        this.get('findProduct').getProduct(tempNum);
        // this.toggleProperty('isShowingModal');
    },
    addToCart(item) {
      this.get('shoppingCart').add(item);
    },

    // addToCart(item) {
    //   this.get('shoppingCart').add(item);
    //   if (this.get("isShowingModal") == true){
    //     this.toggleProperty('isShowingModal');
    //   }
    // },
    toggleModal() {
      this.get('findProduct').toggleModal();
    }
  }
});
