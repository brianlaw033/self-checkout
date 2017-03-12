import Ember from 'ember';
import CryptoJS from 'cryptojs';

export default Ember.Component.extend({
  login: Ember.inject.service(),
  signUpService: Ember.inject.service(),
  chosenType: null,
  actions:{
    submitForm(){
      var username = this.get('username');
      const password = CryptoJS.SHA256(this.get('password')).toString();
      const again = CryptoJS.SHA256(this.get('again')).toString();
      var type = this.get('chosenType');
      return this.get('signUpService').checkUsername(username, password, again, type);
    },
    selectType(type){
      this.set('chosenType', type);
    }
  }
});
