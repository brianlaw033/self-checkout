import Ember from 'ember';

export default Ember.Service.extend({
  items: [],

  canpay: false,
  totalprice: parseFloat(0),

  add(item){
    var filterItems = this.get('items').filter(function(currentItem){
      return currentItem.get('id')==item.get('id');
    });
    if(filterItems==false){
      this.get('items').pushObject(item);
    }
    var total = this.get('totalprice');
    this.set('totalprice', parseFloat(total+item.get('price')));
    var new_quantity = item.get('quantity_selected')+1;
    item.set('quantity_selected',new_quantity);
    this.set('canpay',true);
  },

  remove(item){
    var total= this.get('totalprice');
    this.set('totalprice', parseFloat(total-item.get('price')));
    var new_quantity = item.get('quantity_selected')-1;
    item.set('quantity_selected',new_quantity);
    if(item.get('quantity_selected')==0){
      this.get('items').removeObject(item);
      this.set('canpay',false);
    }
  }
});
