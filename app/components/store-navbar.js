import Ember from 'ember';

export default Ember.Component.extend({
<<<<<<< HEAD
  salesGraph: Ember.inject.service(),
  login: Ember.inject.service(),

  actions:{
    showgraph(sales){
      this.get('salesGraph').showSales(sales);
    },
    logout(){
      this.get('login').logout();
    }
  }
=======
>>>>>>> gabriel
});
