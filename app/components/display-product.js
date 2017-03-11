import Ember from 'ember';

export default Ember.Component.extend({
  findProduct: Ember.inject.service(),
  actions:{
    getBarcode(){
        var tempNum = this.get('controller.barcode');
        this.get('findProduct').getProduct(tempNum);
    }

  }
});
