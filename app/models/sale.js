import DS from 'ember-data';

export default DS.Model.extend({
  barcode: DS.attr(),
  brand: DS.attr(),
  price: DS.attr(),
  image: DS.attr(),
  name: DS.attr(),
  quantity_selected: DS.attr(),
  year: DS.attr(),
  month: DS.attr(),
  day: DS.attr()
});
