import Ember from 'ember';

export default Ember.Component.extend({
login: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      shops: this.store.findAll('shop')
    });
  }
});
