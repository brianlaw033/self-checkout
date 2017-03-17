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
      var date = new Date(sale.get('year')+ ', '+sale.get('month')+', ' + sale.get('day'));
      var dateTester= ((date.getYear()+1900)+", "+(date.getMonth()+1)+", "+date.getDate());
      rowArray.push(dateTester);
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
    // 1: {
    //   title:'Items',
    //   format: '',
    //   textStyle: {color: '#356bc4'}
    // }
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
    var currentDate1=new Date ();
    var currentDateTester= new Date((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth()+1)+", "+(currentDate1.getDate()));
    var currentDateTester1= new Date((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth()+1)+", "+(currentDate1.getDate()+1));
    var oneMonthAgoDateTester= new Date((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth())+", "+currentDate1.getDate());
    var currentDate=oneMonthAgoDateTester;
    var salesArrays1 = this.get('createArray');
    var salesArrays2 = salesArrays1(matching);
    debugger;
    while (currentDate<currentDateTester1){
      var salesArrays = salesArrays2;
      var dateFilled = false;
      console.log(salesArrays);
      salesArrays.forEach(function(sale){
        var dateArray = sale[0].split(',');
        var date = new Date (dateArray[0]+", "+dateArray[1]+", "+dateArray[2]);
        var saleDateTester= ((date.getYear()+1900)+", "+(date.getMonth()+1)+", "+date.getDate());
        var lastMonthDate= ((date.getYear()+1900)+", "+(date.getMonth())+", "+date.getDate());
        var currentDate1=new Date (currentDate);
        var currentDateTester= ((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth()+1)+", "+currentDate1.getDate());
        var lastMonthDateTester=((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth())+", "+currentDate1.getDate());
        var allfilled = false;
        if(currentDateTester === saleDateTester){
          dateFilled=dateFilled;
          var srow_arr = [];
          srow_arr.push(date);
          var totalPrice = sale[1];
          srow_arr.push(totalPrice);
          salesArrays=salesArrays;
          allfilled=allfilled;
          salesArrays.forEach(function(sales){
            allfilled=allfilled;
            var insideArray = srow_arr;
            var dateArray2 = sales[0].split(',');
            var date2 = new Date (dateArray2[0]+", "+dateArray2[1]+", "+dateArray2[2]);
            var saleDateTester2= ((date2.getYear()+1900)+", "+(date2.getMonth()+1)+", "+date2.getDate());
            if(lastMonthDateTester === saleDateTester2){
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

        var newDate=new Date (currentDate);
        var row_arr = [];
        row_arr.push( newDate );
        row_arr.push(0);
        var allfilled2 = false
        salesArrays.forEach(function(sale){

          row_arr=row_arr;
          var dateArray = sale[0].split(',');
          var date = new Date (dateArray[0]+", "+dateArray[1]+", "+dateArray[2]);
          var saleDateTester= ((date.getYear()+1900)+", "+(date.getMonth()+1)+", "+date.getDate());
          var currentDate1=new Date (currentDate);
          var lastMonthDateTester= ((currentDate1.getYear()+1900)+", "+(currentDate1.getMonth())+", "+currentDate1.getDate());
          if(lastMonthDateTester === saleDateTester){

            var lastMonthsSale = sale[1];
            row_arr.push(lastMonthsSale);
            allfilled2 = true;
          }
        });
        if (allfilled2==false){
          row_arr.push(0);
        }
      data.push(row_arr);
      console.log(data);
      }

      var newDate=new Date (currentDate);
      var currentDate1 = newDate.setDate(newDate.getDate() + parseInt(1));
      console.log(currentDate1);
      var currentDate = new Date (currentDate1);
      console.log(currentDate);

    }
    debugger;
    //
    // this.set('show', true);
  },


});
