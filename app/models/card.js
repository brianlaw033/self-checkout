import DS from 'ember-data';

export default DS.Model.extend({
  fullname: DS.attr(),
  number: DS.attr('number'),
  date: DS.attr(),
  security: DS.attr(),
  customer: DS.belongsTo('customer', { async: true})
});
