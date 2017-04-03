/** @desc functions that create the console output **/
module.exports = {
  /**
    * @desc format order fees for console display
    * @param json containing the prices for each order
    * @return console output of all prices for each order
  **/
  formatOrders: function(orders) {
    var text = "";
    orders.forEach(function(order) {
      text += "Order ID: " + order.order_number + "\n";
      order.order_prices.forEach(function(item) {
        text += "\tOrder item " + item.order_item_id + " " +
                   item.type +": $" + parseFloat(item.price).toFixed(2) + "\n";
      });
      text += "\tOrder total: $" +
              parseFloat(order.order_total).toFixed(2) + "\n";
    });
    return text;
  }
}
