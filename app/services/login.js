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
   userObj: null,

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
             self.set('logedin', true);
             if (temp.get('type') === 'seller'){
                self.set('currentUser', temp.get('username'));
                self.set('userId', temp.get('id'));
                Cookies.set('userId', temp.get('id'));
                Cookies.set('type', temp.get('type'));
                Cookies.set('currentUser', temp.get('username'));
                self.set('seller', true);
                self.get("routing").transitionTo("store-index", [temp.get('id')]);
             }else if (temp.get('type') === 'customer'){
                self.set('currentUser', temp.get('username'));
                self.set('userId', temp.get('id'));
                Cookies.set('userId', temp.get('id'));
                Cookies.set('type', temp.get('type'));
                Cookies.set('currentUser', temp.get('username'));
                self.set('customer', true);
                self.get("routing").transitionTo("select-shop");
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
    Cookies.remove('type');
    Cookies.remove('currentUser');
    this.set('seller', false);
    this.set('customer', false);
    this.set('logedin', false);
    this.get("routing").transitionTo("index");
  },
  initializeFromCookie: function(){
    debugger;
    var self = this;
    var userId = Cookies.get('userId');
    var person = this.get('store').findRecord('user', userId).then(function(user){
      self.set('person', user)
    });
    var type = Cookies.get('type');
    this.set('userId', userId);
    var currentUser = Cookies.get('currentUser');
    if(!!userId){
      self.set('logedin', true);
      self.set('currentUser', currentUser);
      if (type === 'seller'){
          self.set('seller', true);
          if(self.get('routing').router.currentPath == 'index'){
            self.get("routing").transitionTo("store-index", [userId]);
          }
        }else if (type === 'customer'){
          self.set('customer', true);
          if(self.get('routing').router.currentPath == 'index'){
            self.get("routing").transitionTo("select-shop");
          }
        }
    }else if(self.get('routing').router.currentPath != 'index'){
      Ember.run.later((function(){
        self.get("routing").transitionTo("index");
      }), 2000);
    }
  }.on('init')
});
