import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('user', params.user_id);
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
