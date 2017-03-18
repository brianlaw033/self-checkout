// import Ember from 'ember';
//
// export default Ember.Component.extend({
//   productFormShow: false,
//
//   actions: {
//     productFormShow() {
//       this.set('productFormShow', true);
//     },
//     update(product) {
//       var params = {
//         barcode: this.get('barcode'),
//         name: this.get('name'),
//         brand: this.get('brand'),
//         description: this.get('description'),
//         price: this.get('price'),
//         image: this.get('image')
//       };
//       this.set('productFormShow', false);
//       this.sendAction('update', product, params);
//     },
//     destroyProduct(product) {
//         if (confirm('Are you sure you want to delete this product record?')) {
//           return product.destroyRecord('product');
//       }
//     }
//   }
// });
