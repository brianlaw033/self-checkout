import DS from 'ember-data';

export default DS.Model.extend({
  barcrode: DS.attr(),
  brand: DS.attr(),
  price: DS.attr(),
  image: DS.attr(),
  name: DS.attr(),
  description: DS.attr()
});
