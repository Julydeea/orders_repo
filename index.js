var express = require('express'),
    app = express();

/** @desc orders and distribution controllers **/
var orders = require('./orders'),
    distrib = require('./distributions');

app.set('json spaces', 2);
/** @desc homepage route **/
app.get('/', function(req, res) {
  res.end();
});

/** @desc routes for orders prices and funds distribution endpointes **/
app.get('/listOrders', orders.controller);
app.get('/listDistrib', distrib.controller);

/** @desc server start **/
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App listening at port ' + port);
});
