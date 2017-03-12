import Ember from 'ember';
import CryptoJS from 'cryptojs';

export default Ember.Service.extend({
   store: Ember.inject.service(),
   routing: Ember.inject.service('-routing'),
   person: null,
   not: true,
   logedin: false,
   seller: false,
   customer: false,
   userType: ['seller', 'customer'],
  checkType(username, password){
    const hash = CryptoJS.SHA256(password).toString();
    var self = this;
    var userInfo = this.get('store').query('user',{
      orderBy: 'username',
      equalTo:  username
    }
  ).then(function(users){
    if(users.get('firstObject') != null){
           var temp = users.get('firstObject');
           var tempPw = temp.get('password');
           if(tempPw == hash){
             self.set('person', temp);
             self.set('not', false);
             self.set('logedin', true);
             if (temp.get('type') === 'seller'){
                self.get("routing").transitionTo("store-index");
                self.set('seller', true);
             }else if (temp.get('type') === 'customer'){
                self.get("routing").transitionTo("customer-index");
                self.set('customer', true);
             }
           }else{
             alert('Wrong password or username');
           };
     } else{
       alert('Wrong password or username');
     }
    });
  }
});
