var request  = require('request');
var cheerio  = require('cheerio');
var jsonfile = require('jsonfile');

request('dreamysoulsite.wordpress.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var title, url, data = [];
    var $ = cheerio.load(html);
    $('h1.entry-title').each(function(i, element){
      title = $(this);
      url = $(this).find('a');
      data.push({
      	'title': title.text(),
      	'url': url.attr('href')
      })
    });
    jsonfile.writeFile('./data.json', data, {spaces: 2}, function(err) {
      console.error("error ", err);
    });
  }
});