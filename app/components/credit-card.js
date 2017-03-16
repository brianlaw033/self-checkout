import Ember from 'ember';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('card', params.user_id)
  },

  // if (customer) {
    addCreditCard: true,
  // } else {
  //   addCreditCard: false;
  // }

  actions: {
    cardFormShow () {
      this.set('addCreditCard', false);
    },
    saveCard (user) {
      var customerObject = user.get('customer');
      var customerId = customerObject;
      var params = {
        fullname: this.get('fullname'),
        number: parseInt(this.get('number')),
        date: this.get('date'),
        security: parseInt(this.get('security')),
        customer: customerId
      };
      this.set('addCreditCard', false);
      this.sendAction('saveCard', params);
    }
  }
});
