import Ember from 'ember';

export default Ember.Component.extend({
  model() {
    return Ember.RSVP.hash({
      sales:this.store.findAll('sale')
    });
  },
  // date: Ember.computed('model.sales', function(){
  //   var sales=this.get('model.sales');
  //   for (i in sales){
  //     return (this.get('sales.day') + "/" + this.get('sales.month')+ "/" + this.get('sales.year'));
  //   }
  // })
});
