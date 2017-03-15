import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('user', params.user_id);
  },
});
