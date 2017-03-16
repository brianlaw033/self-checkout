import DS from 'ember-data';

export default DS.Model.extend({
  card: DS.belongsTo('card', { async: true}),
  user: DS.belongsTo('user', { async: true})
});
