import Ember from 'ember';

export function totalSales(params/*, hash*/) {
  var newtotal=0;
  var sales=params[0];
  sales.forEach(function(sale){
    newtotal = newtotal+sale.get('price')*(sale.get('quantity_selected'));
  })
  return newtotal.toPrecision(4);
}

export default Ember.Helper.helper(totalSales);
