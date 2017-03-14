import Ember from 'ember';

export default Ember.Component.extend({
  shopFormShow: false,

  actions: {
  shopFormShow() {
      this.set('shopFormShow', true);
    },
    update(shop) {
      var params = {
        shopname: this.get('shopname'),
        location: this.get('location'),
        description: this.get('description'),
        promotion: this.get('promotion'),
        photo: this.get('photo')
      };
      this.set('shopFormShow', false);
      this.sendAction('update', shop, params);
    },
  }
});
