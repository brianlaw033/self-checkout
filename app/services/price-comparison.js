import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Ember.Service.extend(FindQuery, {
  store: Ember.inject.service(),
  tempProducts: [],

  getProduct(tempNum, params){
    var barcode = parseInt(tempNum);
    var shop = params.shop_id;
    var self = this;
    this.set('tempProducts', []);
    return this.filterCustom(this.get('store'),'product', {
      'barcode': ['==', barcode],
      'shop.id': ['!=', shop]
    }, function(products){
      products.forEach(function(product){
        var tempShop = product.get('shop');
        var shopId = tempShop.get('id');
        console.log(shopId);
        var price = product.get('price');
        var getShop = self.get('store').findRecord('shop', shopId)
        .then(function(shops){
          var productArray = self.get('tempProducts');
          var tempArray = [];
          var shop = shops.get('shopname');
          console.log(shop);
          tempArray.push(shop);
          tempArray.push(price);
          productArray.push(tempArray);
        })
      });
    });
  }
});
