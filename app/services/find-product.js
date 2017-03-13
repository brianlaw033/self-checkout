import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  display: null,
  isShowingModal: false,
  getProduct(tempNum){
      var barcodeNum = parseInt(tempNum);
      var self = this;
      return this.get('store').query('product',{
        orderBy: 'barcode',
        equalTo:  barcodeNum
      })
      .then(function(products){
        var temp = products.get('firstObject');
        self.set('display', temp);
        self.set('isShowingModal', true);
      });
  },
  toggleModal() {
    this.set('isShowingModal',false);
  }
});
