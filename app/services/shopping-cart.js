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
    this.set('totalprice', Math.round(parseFloat(total+item.get('price'))*100)/100);
    var new_quantity = item.get('quantity_selected')+1;
    item.set('quantity_selected',new_quantity);
    this.set('canpay',true);
  },

  remove(item){
    var total= this.get('totalprice');
    this.set('totalprice', Math.round(parseFloat(total-item.get('price'))*100)/100);
    var new_quantity = item.get('quantity_selected')-1;
    item.set('quantity_selected',new_quantity);
    debugger;
    if(item.get('quantity_selected')==0){
      this.get('items').removeObject(item);
    }
    if(this.get('items').length==0){
      this.set('canpay',false);
    }
  },

  clearCart(){
    var itemsArray = this.get('items');
    itemsArray.forEach(function (item){
       item.set('quantity_selected',0);
    });
    this.set('items', []);
    this.set('totalprice',0);
    this.set('canpay',false);
  }
});
