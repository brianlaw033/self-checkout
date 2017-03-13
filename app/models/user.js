import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr(),
  password: DS.attr(),
  type: DS.attr(),
  storedetail: DS.belongsTo('user', {async: true})
});
