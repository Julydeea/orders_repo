/**
 * @desc helper functions used to access and
 * process order and distribution fees
**/
var fees = require("../db/db").fees;

/**
  * @desc retrieve the fees of an order
  * @param type of the order
  * @return order object
**/
function getOrderByType(orderType) {
  var orderId = fees.filter(function(elem) {
      return elem.order_item_type == orderType;
  });
  return orderId[0];
}

/**
  * @desc retrieve the fee of an order type for a specific fee type (flat or per-page)
  * @param type of the order
  * @param type of the fee
  * @return fee associated with the type of the current order
 */
function getFeeByType(orderType, feeType) {
     var order = getOrderByType(orderType);
     if (order != undefined) {
       var feeId = order.fees.filter(function(elem) {
         return (elem.type === feeType);
       });
       var fee = feeId[0];
       if (fee != undefined) {
         return parseFloat(fee.amount);
       }
     }
     return 0.0;
}

/**
  * @desc functions used in controllers to help the compute of fees
**/
module.exports = {
    /**
     * @desc compute the fee of an order item
     * @param an order item object
     * @return total fee of the order item flat and per-page amounts
    **/
    getItemFee: function(item) {
      var fee = 0.0;
      var feePerPage = getFeeByType(item.type, "per-page");
      if (feePerPage > 0 && item.pages != undefined && item.pages > 0) {
        fee += (item.pages-1) * feePerPage;
      }
      fee += getFeeByType(item.type, "flat");
      return fee;
    },
    /**
      * @desc compute cumulative fees of an order
      * @param current order object
      * @return an object containing the fees for each order item type
    **/
    getFeesForOrder: function(order) {
      var items_fee = {};
      order.order_items.forEach( function(item) {
        var fee = this.getItemFee(item);
        if (items_fee[item.type] == undefined) {
            items_fee[item.type] = fee;
        }
        else {
          items_fee[item.type] += fee;
        }
      }, this);
      return items_fee;
    },
    /**
      * @desc retrieve the distribution of fund fees
      * @param type of an order
      * @return  funds distribution for current order
    **/
    getDistributions: function(orderType) {
      var order = getOrderByType(orderType);
      return order.distributions;
    }
};
