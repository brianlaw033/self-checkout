import Ember from 'ember';

export default Ember.Component.extend({
  customerFormShow: false,

  actions: {
  customerFormShow() {
      this.set('customerFormShow', true);
    },
    update(customer) {
      var params = {
        name: this.get('name'),
        location: this.get('location'),
        icon: this.get('icon')
      };
      this.set('customerFormShow', false);
      this.sendAction('update', customer, params);
    },
  }
});
