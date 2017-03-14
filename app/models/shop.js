import DS from 'ember-data';

export default DS.Model.extend({
  shopname: DS.attr(),
  location: DS.attr(),
  description: DS.attr(),
  photo: DS.attr(),
  promotion: DS.attr(),
  user: DS.belongsTo('user', { async: true}),
  products: DS.hasMany('product', {async:true})
});
