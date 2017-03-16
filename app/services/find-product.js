import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Service.extend(FindQuery, {
  store: Ember.inject.service(),
  display: null,
  isShowingModal: false,
  notFound: false,

  getProduct(tempNum, params){
    var barcode = parseInt(tempNum);
    var shop = params.shop_id
    this.set('notFound', false);
    var self = this;
    return this.filterCustom(this.get('store'),'product', {
      'barcode': ['==', barcode],
      'shop.id': ['==', shop]
    }, function(products){
      debugger;
      var temp = products.get('firstObject');
      if(temp == undefined){
        self.set('notFound', true);
      }else{
        self.set('display', temp);
        self.set('isShowingModal', true);
      }
    });
  },

  //
  // getProduct(tempNum, params){
  //     var barcodeNum = parseInt(tempNum);
  //     var self = this;
  //     return this.get('store').query('product',{
  //       orderBy: 'barcode',
  //       equalTo:  barcodeNum
  //     })
  //     .then(function(products){
  //       var temp = products.get('firstObject');
  //       self.set('display', temp);
  //       self.set('isShowingModal', true);
  //     });
  // },
  toggleModal() {
    this.set('isShowingModal',false);
    this.set('notFound', false);
  }
});
