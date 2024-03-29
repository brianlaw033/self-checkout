import Ember from 'ember';

export function totalSales(params) {
  var newtotal=0;
  var sales=params[0];
  sales.forEach(function(sale){
    newtotal = newtotal+sale.get('price')*(sale.get('quantity_selected'));
  })
  return Math.round(newtotal);
}

export default Ember.Helper.helper(totalSales);
