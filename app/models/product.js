import DS from 'ember-data';

export default DS.Model.extend({
  barcode: DS.attr('number'),
  brand: DS.attr(),
  price: DS.attr(),
  image: DS.attr(),
  name: DS.attr(),
  description: DS.attr(),
  shop: DS.belongsTo('shop', {async: true}),
  quantity_selected: DS.attr('number')
});
