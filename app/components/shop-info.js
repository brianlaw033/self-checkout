import Ember from 'ember';

export default Ember.Component.extend({
  model() {
    return Ember.RSVP.hash({
      shops: this.store.findAll('shop')
    });
  }
});
