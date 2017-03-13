import Ember from 'ember';

export default Ember.Component.extend({
  shoppingCart: Ember.inject.service(),

  actions:{
    addsoldItems(shoppingCart_Items){
      this.sendAction('addsoldItems',shoppingCart_Items);
    }
  }
});
