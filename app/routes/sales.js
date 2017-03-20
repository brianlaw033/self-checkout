import Ember from 'ember';

export default Ember.Route.extend({
  login: Ember.inject.service(),
  model(params) {
    return Ember.RSVP.hash({
      sales:this.store.findAll('sale'),
      user: this.store.findRecord('user',params.user_id)
    });
  },

  doneSalesArray: [],
  constantDatas: [['Date', "This Month's Revenue" ,"Last Month's Revenue"]],
  datas: [['Date', "This Month's Revenue" ,"Last Month's Revenue"]],
  matching : [],
  createArray(sales){
    var salesArray = [];
    var salesMade=sales;
    salesMade.forEach(function(sale){
      var rowArray = [];
      var saleDate = moment(sale.get('year')+ ', '+sale.get('month')+', ' + sale.get('day')).format("YYYY-MM-DD");
      rowArray.push(saleDate);
      var totalPrice = sale.get('quantity_selected')*sale.get('price');
      rowArray.push(totalPrice);
      var lastMonthSale = 0;
      rowArray.push(lastMonthSale);
      salesArray.push(rowArray);
    });
    for(var i = 0; i <salesArray.length-1; i++){
      while(salesArray[i][0] === salesArray[i+1][0]){
        salesArray[i][1] = parseInt(salesArray[i][1])+parseInt(salesArray[i+1][1]);
        salesArray[i][2] = parseInt(salesArray[i][2])+parseInt(salesArray[i+1][2]);
        salesArray.splice(i+1,1);
        if(i === salesArray.length-1){
          break;
        }
      }
    }
    return salesArray;
  },
  show:false,

  setupController(controller,model){
    this._super(controller,model);
    controller.set('datasTwo', this.get('datas'));
    controller.set('options', this.get('options'));
    controller.set('matching', this.get('matching'));
  },

  options: {
    title: 'Store Sales Record',
    interpolateNulls: true,
    height: 400,
    hAxis: {format: 'dd-MMM', gridlines:{count:10}},
    orientation: 'horizontal',
    animation: {
      startup: true,
      easing: 'inAndOut',
   },
   series: {
            0: {targetAxisIndex:0,
                lineWidth:0.5},
            1: {targetAxisIndex:0,
                lineWidth:0.5}
  },
  vAxes: {
    0: {
      format: 'currency'
    },
    }
  },

  activate: function(){
    this.set('doneSalesArray', []);
    this.set('matching', []);
    this.set('datas', [['Date', "This Month's Revenue" ,"Last Month's Revenue"]]);
    var info = this.modelFor(this.routeName);
    var user = info.user;
    var sales = info.sales;
    var matching = this.get('matching');
    var shop = user.get('shop');
    var shopId = shop.get('id');
    //fill up an array of this shops sold items for display on sales page and use for graph
    sales.forEach(function(soldItem){
      if (soldItem.get('shop').get('id')== shopId){
        matching.push(soldItem);
      }
    });
    matching.reverse(); //show latest sale at the top
    var data = this.get('datas');
    var currentDate1= moment();
    debugger;
    var oneMonthAgoDateTester= moment().subtract(1, 'month').format("YYYY-MM-DD");
    var currentDate=moment(oneMonthAgoDateTester);//initialize the testing date to last months date
    var salesArrays1 = this.get('createArray');
    var salesArrays2 = salesArrays1(matching);
    while (currentDate.isBefore(currentDate1)){
      var salesArrays = salesArrays2;
      var dateFilled = false;
      //get each sales date
      salesArrays.forEach(function(sale){
        var saleDate = moment(sale[0]).format("YYYY-MM-DD");
        var currentDate1=moment(currentDate).format("YYYY-MM-DD");
        var lastMonthDateTester=moment(currentDate).subtract(1,'month').format("YYYY-MM-DD");
        var allfilled = false;
        //check if the sale date is equal to the current date being filled up. The "current date" is initialized to last months date.
        if(currentDate1 === saleDate){
          dateFilled=dateFilled;
          var srow_arr = [];
          srow_arr.push(saleDate); //push the date as the first element of this array
          var totalPrice = sale[1];
          srow_arr.push(totalPrice); //push the total sales for that day as the 2nd element of this array
          salesArrays=salesArrays;
          allfilled=allfilled;
          //for each sale check if it is equal to the date 1 month before the "current date". or initially 2 months before today
          salesArrays.forEach(function(sales){
            allfilled=allfilled;
            var insideArray = srow_arr;
            var saleDate2 = moment(sales[0]).format("YYYY-MM-DD");
            //if it is, fill in the sales from 2 months ago
            if(lastMonthDateTester === saleDate2){
              allfilled=true;
              var lastMonthsSale = sales[1]; //push last months sale as the 3rd element in this array
              insideArray.push(lastMonthsSale);
            }
          });
          if(allfilled == false){
            srow_arr.push(0);//push 0 sales if non of the sales objects corresponded to the current date being tested - 1. (2months ago from today initially)
          }
          data.push(srow_arr);//push this "inner array" to the main array
          dateFilled=true;
        }
      });
      //if no sale was made on the current date being tested
      if(dateFilled == false){
        var newDate= moment(currentDate).format("YYYY-MM-DD");
        var row_arr = [];
        row_arr.push( newDate );//push the current date being tested as the first element of this array
        row_arr.push(0);// no sales as the second
        var allfilled2 = false
        //check if any sales have been made 1 month prior to the current testing date
        salesArrays.forEach(function(sale){
          row_arr=row_arr;
          var saleDate3 = moment(sale[0]).format("YYYY-MM-DD");
          var monthBefore=moment(currentDate).subtract(1,'month').format("YYYY-MM-DD");
          if(monthBefore === saleDate3){
            var lastMonthsSale = sale[1];
            row_arr.push(lastMonthsSale);
            allfilled2 = true;
          }
        });
        //if not, push sales 0
        if (allfilled2==false){
          row_arr.push(0);
        }
        data.push(row_arr);
      }
      currentDate.add(1,'d').format("YYYY-MM-DD");//increment current date being tested
    }
  },


});
