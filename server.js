var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

// app.get('/scrape', function(req, res){
	//The magic happens here

	//url
	var bars = ["iota-club-and-cafe-arlington", "galaxy-hut-arlington", "world-of-beer-arlington-2", "the-liberty-tavern-arlington"]
	for (i = 0; i <= bars.length-1; i++) {
		url = 'http://www.yelp.com/biz/' + bars[i];
		
		request(url, function(error, response, html){

			if(!error){

				var $ = cheerio.load(html);

				var name, address, hours;
				var json = { name : "", address : "", hours : ""};
			
				$('.biz-page-title').filter(function(){
					var data = $(this);
					name = data.text();

					json.name = name.replace(/(\s+|\n)/gm," ");
				})

				$('.street-address').filter(function(){
					var data = $(this);

					address = data.text();
					json.address = address.replace(/(\s+|\n)/gm," ");
				})

				$('.hours-table').filter(function(){
					var data = $(this);

					hours = data.text();
					json.hours = hours.replace(/(\s+|\n)/gm," ");
				})
			}
			fs.appendFile('output.json', JSON.stringify(json, null, 4), function(err){
				console.log('File successfully written! Check for output.json file.');
			})
			
			// res.send('Check your console!')
		})
	}

// });

// app.listen('3000');

// console.log('Sever running on port 3000');

// exports = module.exports = app;