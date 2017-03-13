import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      products: this.store.findAll('product'),
      sales:this.store.findAll('sale')
    });
  },
  actions : {
    addsoldItems(soldItems){
      var self = this.store;
      soldItems.forEach(function(element){
        var newSale = self.createRecord('sale');
        element.eachAttribute(function(some) {
          newSale.set(some,element.get(some));
        });
        var now = new Date();
        var curr_year = now.getFullYear();
        var curr_Month = now.getMonth() + 1;
        var curr_date = now.getDate();
        newSale.set('year',curr_year);
        newSale.set('month',curr_Month);
        newSale.set('day',curr_date);
        newSale.save();
      });
    }
  }
});
