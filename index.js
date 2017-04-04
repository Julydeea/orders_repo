var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

/** @desc orders and distribution controllers **/
var orders = require('./orders'),
    distrib = require('./distributions');

app.set('json spaces', 2);
app.use(bodyParser.json());
/** @desc homepage route **/
app.get('/', function(req, res) {
  res.end();
});

/** @desc routes for orders prices and funds distribution endpointes **/
app.post('/listOrders', orders.controller);
app.post('/listDistrib', distrib.controller);

/** @desc server start **/
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('App listening at port ' + port);
});
