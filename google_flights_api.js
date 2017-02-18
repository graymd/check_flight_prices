// https://developers.google.com/qpx-express/v1/trips/search#request
// http://stackoverflow.com/questions/27190447/pass-json-to-http-post-request
const request = require('request');
const R = require('ramda');
const fs = require('fs');
const util = require('util');
const flightData = require('./request_data.json');
const apiKey = require('./api_key.json');
const url = `https://www.googleapis.com/qpxExpress/v1/trips/search?key=${apiKey.key}`;
const getTripCost = R.compose(R.prop('saleTotal'), R.head, R.path(['trips', 'tripOption']));
const removeUSD = R.replace('USD', '');
const getTripCostAsFloat = parseFloat(removeUSD);
const diff = function(a, b) { return a - b; };
// R.sort(diff, )

request({
  url: url,
  method: "POST",
  json: flightData
}, (err, resp, body) => {
  if (!err && resp.statusCode === 200) {

    fs.writeFile('flightData.txt', JSON.stringify(body, null, 2), (err) => {
      if (err) throw err;
      console.log("it saved");
    })
  }
  else {
    console.log("error: " + response.statusText);
  }
});
