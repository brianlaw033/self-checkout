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
   currentUser: null,
   userId: null,

  checkType(username, password){
    const hash = CryptoJS.SHA256(password).toString();
    var self = this;
    return this.get('store').query('user',{
      orderBy: 'username',
      equalTo:  username
    }
  ).then(function(users){
    if(users.get('firstObject') != null){

           var temp = users.get('firstObject');
           var tempPw = temp.get('password');
           if(tempPw === hash){
             self.set('person', temp);
             self.set('not', false);
             self.set('logedin', true);
             if (temp.get('type') === 'seller'){
                self.set('currentUser', temp.get('username'));
                Cookies.set('userId', temp.get('id'));
                self.get("routing").transitionTo("store-index", [temp.get('id')]);
                self.set('seller', true);
             }else if (temp.get('type') === 'customer'){
                self.set('currentUser', temp.get('username'));
                Cookies.set('userId', temp.get('id'));
                self.get("routing").transitionTo("customer-index");
                self.set('customer', true);
             }
           }else{
             alert('Wrong password or username');
           }
     } else{
       alert('Wrong password or username');
     }
    });
  },
  logout(){
    this.set('currentUser', null)
    Cookies.remove('userId');
    this.set('seller', false);
    this.set('customer', false);
    this.set('logedin', false);
    this.get("routing").transitionTo("index");
  },
  initializeFromCookie: function(){
    var self = this;
    var userId = Cookies.get('userId');
    if(!!userId){
      return this.get('store').findRecord('user', userId).then(function(user){
        var username = user.get('username');
        var type = user.get('type');
        self.set('logedin', true);
        self.set('currentUser', username);
        if (type === 'seller'){
          self.set('seller', true);
        }else{
          self.set('customer', true);
        }
      })
    }else{
      Ember.run.later((function(){
        self.get("routing").transitionTo("index");
      }), 2000);
    }
  }.on('init')
});
