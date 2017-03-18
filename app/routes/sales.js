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
    sales.forEach(function(soldItem){
      if (soldItem.get('shop').get('id')== shopId){
        matching.push(soldItem);
      }
    });
    matching.reverse();
    var data = this.get('datas');
    var currentDate1= moment().add(1,'m');
    var oneMonthAgoDateTester= moment().subtract(1, 'month').format("YYYY-MM-DD");
    var currentDate=moment(oneMonthAgoDateTester);
    var salesArrays1 = this.get('createArray');
    var salesArrays2 = salesArrays1(matching);
    debugger;
    while (currentDate.isBefore(currentDate1)){
      var salesArrays = salesArrays2;
      var dateFilled = false;
      salesArrays.forEach(function(sale){
        var saleDate = moment(sale[0]).format("YYYY-MM-DD");
        var lastMonthDate = moment(sale[0]).subtract(1,'month').format("YYYY-MM-DD");
        var currentDate1=moment(currentDate).format("YYYY-MM-DD");
        var lastMonthDateTester=moment(currentDate).subtract(1,'month').format("YYYY-MM-DD");
        var allfilled = false;
        if(currentDate1 === saleDate){
          dateFilled=dateFilled;
          var srow_arr = [];
          srow_arr.push(saleDate);
          var totalPrice = sale[1];
          srow_arr.push(totalPrice);
          salesArrays=salesArrays;
          allfilled=allfilled;
          salesArrays.forEach(function(sales){
            allfilled=allfilled;
            var insideArray = srow_arr;
            var dateArray2 = sales[0];
            var saleDate2 = moment(sales[0]).format("YYYY-MM-DD");
            if(lastMonthDateTester === saleDate2){
              allfilled=true;
              var lastMonthsSale = sales[1];
              insideArray.push(lastMonthsSale);
            }
          });
          if(allfilled == false){
            srow_arr.push(0);
          }
          data.push(srow_arr);
          dateFilled=true;
        }
      });
      if(dateFilled == false){
        var newDate= moment(currentDate).format("YYYY-MM-DD");
        var row_arr = [];
        row_arr.push( newDate );
        row_arr.push(0);
        var allfilled2 = false
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
        if (allfilled2==false){
          row_arr.push(0);
        }
        data.push(row_arr);
      }
      currentDate.add(1,'d').format("YYYY-MM-DD");
    }
  },


});
