var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  request('http://screeninteraction.com/people', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var arr = [];
      $('.person').each(function(i, element){
        var name = $(this).find('h3').text();
        var role = $(this).find('p').text();
        var img = $(this).find('img').data('src')
        // console.log(name);
        // console.log(role);
        // console.log(img);
        arr.push({
          name: name,
          role: role,
          img: 'http://screeninteraction.com' + img
        });
      });
      // console.log(arr);
      res.render('index', { data: JSON.stringify(arr) });
    }
  });
});

module.exports = router;


