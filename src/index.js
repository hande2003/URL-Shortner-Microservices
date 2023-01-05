require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const postURL = require("./routes/getPostShortUrl");
const goToURL = require("./routes/short-url");

app.set('view engine', 'ejs');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json()); 

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/', postURL);

app.use('/', goToURL);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

