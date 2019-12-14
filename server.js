// server.js
// where your node app starts

// init project
const moment = require('moment');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get('/api/timestamp/:date_string?', (req, res) => {
  const { date_string } = req.params;
  let date, response;
  
  if (date_string) {
    date = moment(date_string);
    if (!date.isValid())
      date = moment(parseInt(date_string));
  }
  else date = moment();
  
  if (date.isValid())
    response = {
      unix: date.valueOf(),
      utc: date.toDate().toUTCString()
    }
  else response = { error: 'Invalid date' };
    
  res.json(response);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});