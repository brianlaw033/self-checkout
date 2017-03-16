import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  icon: DS.attr(),
  location: DS.attr(),
  user: DS.belongsTo('user', { async: true}),
  card: DS.belongsTo('card', { async: true})
});
