import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.set('params', params);
  },
  setupController(controller, model) {
    controller.set('params', this.get('params'));
    this._super(controller, model);
  },

  actions : {
    addsoldItems(soldItems, currentUser){
      debugger;
      var currentUser = currentUser;
      console.log(currentUser);
      var self = this.store;
      soldItems.forEach(function(element){
        var newSale = self.createRecord('sale');
        element.eachAttribute(function(some) {
          newSale.set(some,element.get(some));
        });
        var now = new Date();
        debugger;
        var curr_year = now.getFullYear();
        var curr_Month = now.getMonth() + 1;
        var curr_date = now.getDate();
        newSale.set('product', element);
        newSale.set('shop', element.get('shop'));
        newSale.set('user', currentUser);
        newSale.set('year',curr_year);
        newSale.set('month',curr_Month);
        newSale.set('day',curr_date);
        newSale.save();
      });
    }
  }
});
