import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      sales:this.store.findAll('sale')
    });
  },
  doneSalesArray: [],
  datas: [['Date', 'Quantity','Revenue']],
  createArray(sales){
    var salesArray = [];
    var salesMade=sales;
    salesMade.forEach(function(sale){
      var rowArray = [];
      var date = new Date(sale.get('year')+ ', '+sale.get('month')+', ' + sale.get('day'));
      var dateTester= ((date.getYear()+1900)+", "+(date.getMonth()+1)+", "+date.getDate());
      rowArray.push(dateTester);
      var totalPrice = sale.get('quantity_selected')*sale.get('price');
      rowArray.push(totalPrice);
      var lastMonthSale = 0;
      rowArray.push(lastMonthSale);
      salesArray.push(rowArray);
    });
    for(var i = 0; i <salesArray.length; i++){
      while(salesArray[i][0] == salesArray[i+1][0]){
        salesArray[i][1] = parseInt(salesArray[i][1])+parseInt(salesArray[i+1][1]);
        salesArray[i][2] = parseInt(salesArray[i][2])+parseInt(salesArray[i+1][2]);
        salesArray.splice(i+1,1);
        if(i == salesArray.length-1){
          break;
        };
      };

    };
    return salesArray;
    doneSalesArray.push(salesArray);
  },
  show:false,

  setupController(controller,model){
    this._super(controller,model);
    controller.set('datasTwo', this.get('datas'));
  },

  activate: function(){

    var sale = this.modelFor(this.routeName);
    var sales = sale.sales;
    var data = this.get('datas');
    var firstSale=sales.get('firstObject');
    var lastSale=sales.get('lastObject');
    var firstDate=new Date(lastSale.get("year")+', '+(lastSale.get('month')-1)+', '+lastSale.get('day'));
    var lastDate=new Date(lastSale.get("year")+', '+lastSale.get('month')+', '+lastSale.get('day'));
    var currentDate=firstDate;
    var salesArrays1 = this.get('createArray');
    var salesArrays = salesArrays1(sales);
    while (currentDate<=lastDate){
      var salesArrays1 = this.get('createArray');
      var salesArrays = salesArrays1(sales);
      var dateFilled = false;
      oldsalesArrays.forEach
      salesArrays.forEach(function(sale){
        var dateArray = sale[0].split(',');
        var date = new Date (dateArray[0]+", "+dateArray[1]+", "+dateArray[2]);
        var saleDateTester= ((date.getYear()+1900)+", "+(date.getMonth()+1)+", "+date.getDate());
        var currentDate1=new Date (currentDate);
        var currentDateTester= ((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth()+1)+", "+currentDate1.getDate());
        if(currentDateTester == saleDateTester){
          var srow_arr = [];
          srow_arr.push(date);
          var quantity = sale[1];
          srow_arr.push(quantity);
          var totalPrice = sale[2];
          srow_arr.push(totalPrice);
          data.push(srow_arr);
          dateFilled=true;
        };
      });
      if(dateFilled==false){
        var row_arr = [];
        row_arr.push( newDate );
        row_arr.push(0);
        row_arr.push(0);
        data.push(row_arr);
      };
      var newDate=new Date (currentDate);
      currentDate = newDate.setDate(newDate.getDate() + parseInt(1));
    }
    this.set('show', true);
    console.log(data);
  },


});
