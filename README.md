Orders and Distributions Solution

Project Organization:
order_fees:
	db : - > provides access to data that is to be processed (orders.js, fees,js)
	distributions: 
		- controller.js -> contains the functions necessary to process the funds distribution for each of the orders
		- view.js -> formats the console output
		- index.js -> provides access to the controller
	helper:
		- fees_helper.js -> provides fees information necessary to process orders and 
			distributions. This is meant to separate the fee processing from the order processing.
	orders:
		- controller.js -> contains the functions necessary to process the prices for each orders
		- view.js -> formats the console output
		- index.js -> provides access to the controller
index.js -> creates the server and routes to access the two endpoints 

The Order Prices output:

```
Order ID: 20150111000001
        Order item 1 Real Property Recording: $28.00
        Order item 2 Real Property Recording: $26.00
        Order total: $54.00
Order ID: 20150117000001
        Order item 3 Real Property Recording: $27.00
        Order item 4 Real Property Recording: $45.00
        Order total: $72.00
Order ID: 20150118000001
        Order item 5 Real Property Recording: $30.00
        Order item 6 Birth Certificate: $23.00
        Order total: $53.00
Order ID: 20150123000001
        Order item 7 Birth Certificate: $23.00
        Order item 8 Birth Certificate: $23.00
        Order total: $46.00
```

The Funds Distribution output:

```
Order ID: 20150111000001
         Fund - Recording Fee: $10.00
         Fund - Records Management and Preservation Fee: $20.00
         Fund - Records Archive Fee: $20.00
         Fund - Courthouse Security: $2.00
         Fund - Other: $2.00
Order ID: 20150117000001
         Fund - Recording Fee: $10.00
         Fund - Records Management and Preservation Fee: $20.00
         Fund - Records Archive Fee: $20.00
         Fund - Courthouse Security: $2.00
         Fund - Other: $20.00
Order ID: 20150118000001
         Fund - Recording Fee: $5.00
         Fund - Records Management and Preservation Fee: $10.00
         Fund - Records Archive Fee: $10.00
         Fund - Courthouse Security: $1.00
         Fund - County Clerk Fee: $20.00
         Fund - Vital Statistics Fee: $1.00
         Fund - Vital Statistics Preservation Fee: $1.00
         Fund - Other: $5.00
Order ID: 20150123000001
         Fund - County Clerk Fee: $40.00
         Fund - Vital Statistics Fee: $2.00
         Fund - Vital Statistics Preservation Fee: $2.00
         Fund - Other: $2.00
Total distributions:
        Fund - Recording Fee: $10.00
        Fund - Records Management and Preservation Fee: $20.00
        Fund - Records Archive Fee: $20.00
        Fund - Courthouse Security: $2.00
        Fund - Other: $2.00
        Fund - County Clerk Fee: $20.00
        Fund - Vital Statistics Fee: $1.00
        Fund - Vital Statistics Preservation Fee: $1.00
```