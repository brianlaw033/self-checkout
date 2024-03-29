import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model() {
    return this.store.findAll('card');
    return this.store.findAll('customer')
  },

  actions: {
    saveCard(params) {
      var self = this;
      var newCard = this.store.createRecord('card', params);
      var customer = params.customer;
      newCard.save().then(function () {
        self.get('login').checkCreditCard();
        return customer.get('_internalModel').save();
      });
    },
    addsoldItems(soldItems, currentUser){
      var currentUser = currentUser;
      var selfThis = this;
      var self = this.store;
      soldItems.forEach(function(element){
        var newSale = self.createRecord('sale');
        element.eachAttribute(function(some) {
          newSale.set(some,element.get(some));
        });
        var now = new Date();
        var curr_year = now.getFullYear();
        var curr_Month = now.getMonth() + 1;
        var curr_date = now.getDate();
        newSale.set('product', element);
        newSale.set('shop', element.get('shop'));
        newSale.set('user', currentUser);
        newSale.set('year',curr_year);
        newSale.set('month',curr_Month);
        newSale.set('day',curr_date);
        newSale.save();
        Cookies.set('cardId', 'justAdded');
        alert('Payment Succesful!')
        Ember.run.later((function(){
          selfThis.transitionTo("select-shop");
        }), 1000);
      });
    }
  }
});
