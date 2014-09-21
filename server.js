var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
	//The magic happens here

	//url anchorman 2
	url = 'http://www.imdb.com/title/tt1229340/';

	request(url, function(error, response, html){

		if(!error){

			var $ = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};
		
			$('.header').filter(function(){

				var data = $(this);

				title = data.children().first().text();
				release = data.children().last().text();

				json.title = title;
				json.release = release;
			})

			$('.star-box-giga-star').filter(function(){
				var data = $(this);

				rating = data.text();
				json.rating = rating;
			})
		}
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			console.log('File successfully written! Check for output.json file.');
		})
		
		res.send('Check your console!')
	})


});

app.listen('8081');

console.log('Sever running on port 8081');

exports = module.exports = app;