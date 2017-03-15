import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('customer-index', {path: '/shop/:shop_id'});
  this.route('store-index', {path: '/store-index/:user_id'});
  this.route('sign-up');
  this.route('sales', {path: '/history/:user_id'});
  this.route('payment');
  this.route('select-shop');
});

export default Router;
