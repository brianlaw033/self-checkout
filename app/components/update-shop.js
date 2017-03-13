import Ember from 'ember';

export default Ember.Component.extend({
  shopFormShow: false,

  actions: {
  shopFormShow() {
      this.set('shopFormShow', true);
    },
    update(shop) {
      var params = {
        name: this.get('name'),
        location: this.get('location'),
        description: this.get('description'),
        promotion: this.get('promotion'),
        photos: this.get('photos')
      };
      this.set('shopFormShow', false);
      this.sendAction('update', shop, params);
    },
  }
});
