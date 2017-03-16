import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model() {
    return this.store.findAll('card');
    return this.store.findAll('customer')
  },

actions: {
  saveCard(params) {
    debugger;
    var newCard = this.store.createRecord('card', params);
    var customer = params.customer;
    newCard.save().then(function () {
      return customer.get('_internalModel').save();
      });
    }
  }
});
