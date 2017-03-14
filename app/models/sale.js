import DS from 'ember-data';

export default DS.Model.extend({
  barcode: DS.attr(),
  brand: DS.attr(),
  price: DS.attr('number'),
  image: DS.attr(),
  name: DS.attr(),
  quantity_selected: DS.attr(),
  year: DS.attr(),
  month: DS.attr(),
  day: DS.attr(),
  shop: DS.belongsTo('shop', {async: true}),
  user: DS.belongsTo('user', { async: true}),
  product: DS.belongsTo('product', { async: true})
});
