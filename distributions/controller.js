/*controller used for funds distribution computation*/
var feesHelper = require("../helper/fees_helper");
var view = require("./view");

/**
 * @desc compute the distribution of funds for an order
 * @param the type of the order
 * @param reference to the object that will contain all
 * funds distributions for the current order
**/
function getOrderDistribution(orderType, orderDistrib) {
    distrib = feesHelper.getDistributions(orderType);
    distrib.forEach(function(elem) {
      if (orderDistrib[elem.name] == undefined){
        orderDistrib[elem.name] = parseFloat(elem.amount);
      }
      else {
        orderDistrib[elem.name] += parseFloat(elem.amount);
      }
    });
}
/**
  * @desc compute remaining funds after the fees have been
  * distributed between all existing entities
  * @param an object that contains all the fees for current order
  * @param an object that contains all fund fees from current order
  * @return the remaining fee that will be attributed to Other fund
**/
function getOtherFunds(orderFees, orderDistrib){
  var totalOrderFees = 0.0;
  var totalDistributedFunds = 0.0;
  for( var fund in orderDistrib) {
    if (!orderDistrib.hasOwnProperty(fund)) continue;
    totalDistributedFunds += parseFloat(orderDistrib[fund]);
  }
  for(var order in orderFees) {
    if (!orderFees.hasOwnProperty(order)) continue;
    totalOrderFees += parseFloat(orderFees[order]);
  }
  return totalOrderFees - totalDistributedFunds;
}

/**
  * @desc  main fund distribution processing function
  * @param an array of orders
  * @return a json structure that contains the distribution
  * total for each order
**/
function processDistributions(orders) {
  var output = [];
    orders.forEach(function(order) {
      orderDistrib = {};
      order.order_items.forEach(function (item){
          getOrderDistribution(item.type, orderDistrib);
      });
      var funds = [];
      for (var fund in orderDistrib) {
        if(!orderDistrib.hasOwnProperty(fund)) continue;
        funds.push( { "name": fund,
                      "amount": parseFloat(orderDistrib[fund]).toFixed(2) });
      }
      var orderFees = feesHelper.getFeesForOrder(order);
      var otherFunds = getOtherFunds(orderFees, orderDistrib);
      if (otherFunds != 0.0) {
        funds.push({"name": "Other",
                    "amount": parseFloat(otherFunds).toFixed(2)});
      }
      output.push({"order_number": order.order_number,
                   "funds" : funds});
    });
    return output;
}

/**
  * @desc  distributions controller
  * @param request information
  * @param response containing the json structure
  * @return display of the funds distribution to console
**/
module.exports = function(req, res) {
    var orders = req.body;
    var funds_json = processDistributions(orders);
    console.log(view.formatFunds(funds_json));

    res.send(funds_json);
};
