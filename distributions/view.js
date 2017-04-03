/** @desc functions that create the console output **/
module.exports = {
  /**
    * @desc compute the total amounts from all orders for each fund
    *  - used only for display in console
    * @param funds distribution for all the orders
    * @return an object with total amount for each fund
  **/
   getTotalFunds: function(fundsDistrib) {
    var total_funds = {};
    var other = 0.0;
    fundsDistrib.forEach(function(elem) {
      elem.funds.forEach(function(fund) {
        if(total_funds[fund.name] == undefined ) {
          if (fund.name == "Other") {
            other += Number(fund.amount);
          }
          else {
            total_funds[fund.name] = Number(fund.amount);
          }
        }
        else {
          total_funds[fund.name] += Number(fund.amount);
        }
      });
    });
    total_funds["Other"] = other;
    return total_funds;
  },

  /**
    * @desc format funds for console display
    * @param json containing all distrinbutions for each order
    * @return console output of each order distribution of funds
  **/
  formatFunds: function(output) {
    var text = "";
    output.forEach(function (order) {
      text += "Order ID: "+ order.order_number + "\n";
      order.funds.forEach(function(fund) {
        text += "\t Fund - " + fund.name + ": $" +
                parseFloat(fund.amount).toFixed(2) +"\n";
      });
    });
    var total_funds = this.getTotalFunds(output);
    text += "Total distributions: \n"
    for(var fund in total_funds) {
      if (!total_funds.hasOwnProperty(fund)) continue;
      text += "\tFund - " + fund +": $" +
              parseFloat(total_funds[fund]).toFixed(2) + "\n";
    }
    return text;
  }
};
