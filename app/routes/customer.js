import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model(params) {
    return Ember.RSVP.hash({
      sales:this.store.findAll('sale'),
      user: this.store.findRecord('user',params.user_id)
    });
  },
  customerMatching : [],

  setupController(controller,model){
    this._super(controller,model);
    controller.set('customerMatching', this.get('customerMatching'));
  },

  activate: function () {
    this.set('customerMatching', []);
    var info = this.modelFor(this.routeName);
    var user = info.user;
    var sales = info.sales;
    var matching = this.get('customerMatching');
    var userId = user.get('id');
    sales.forEach(function(soldItem){
      if (soldItem.get('user').get('id')== userId){
        matching.push(soldItem);
      }
    });
  },

  actions: {
      update(customer, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          customer.set(key,params[key]);
        }
        customer.get('_internalModel').save();
      });
    }
  }
});
