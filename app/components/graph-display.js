import Ember from 'ember';

export default Ember.Component.extend({
  salesGraph: Ember.inject.service(),
  model() {
    return this.store.findAll('sale');
  },

  datas: [['Year', 'Sales']],
  options: {
    title: 'Total Sales',
    height: 400,
    width: 1000,

    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  },

  show:false,
  actions : {
    showSales(sales){
      var data = this.get('datas');
      var firstSale=sales.get('firstObject');
      var firstDate=new Date(firstSale.get("year")+', '+firstSale.get('month')+', '+firstSale.get('day'));
      var lastSale=sales.get('lastObject');
      var lastDate=new Date(lastSale.get("year")+', '+lastSale.get('month')+', '+lastSale.get('day'));
      var currentDate=firstDate;
      var salesMade=sales;
      while (currentDate<=lastDate){
        var dateFilled = false;
        salesMade.forEach(function(sale){
          debugger;
          var date = new Date (sale.get('year')+", "+sale.get('month')+", "+sale.get('day'));
          var saleDateTester= ((sale.get('year')-1900)+", "+sale.get('month')+", "+sale.get('day'));
          var currentDate1=new Date (currentDate);
          var currentDateTester= (currentDate1.getYear()+", "+(currentDate1.getMonth()+1)+", "+currentDate1.getDate());
          if(currentDateTester == saleDateTester){
            var srow_arr = [];
            srow_arr.push(date);
            var quantity = sale.get('quantity_selected');
            srow_arr.push(quantity);
            data.push(srow_arr);
            currentDate = currentDate1.setDate(currentDate1.getDate() + parseInt(1));
            dateFilled=true;
          };
        });
        if(dateFilled==false){
          var row_arr = [];
          var newDate=new Date (currentDate);
          row_arr.push( newDate );
          row_arr.push(0);
          data.push(row_arr);
          currentDate = newDate.setDate(newDate.getDate() + parseInt(1));
        };

      }
      this.set('show', true);
    }
  }
});
