/*controller used for the computation of order fees */
var feesHelper = require('../helper/fees_helper');
var view = require("./view");

/**
  * @desc orders processing function
  * @param array of orders
  * @return a json structure that contains the total fees for each order
**/
function processOrders(orders) {
    var output = [];
    orders.forEach(function(order) {
        var orderItemPrices = [];
        var totalOrderPrice = 0.0;
        order.order_items.forEach(function(item) {
          var price = feesHelper.getItemFee(item);
          totalOrderPrice += price;
          orderItemPrices.push({ "order_item_id": item.order_item_id,
                                 "type": item.type,
                                 "price": parseFloat(price).toFixed(2) } );
        });
        var orderElem = {};
        orderElem["order_number"] = order.order_number;
        orderElem["order_prices"] = orderItemPrices;
        orderElem["order_total"] = parseFloat(totalOrderPrice).toFixed(2);
        output.push(orderElem);
    });
    return output;
}
/**
  * @desc orders controller
  * @param request information
  * @param response containing the json structure
  * @return display of the order prices to console
**/
module.exports = function(req, res) {
  var orders = req.body;
  var ordersJson = processOrders(orders);
  console.log(view.formatOrders(ordersJson));

  res.send(ordersJson);
};
