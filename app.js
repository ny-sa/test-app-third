const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');

const app = new express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  let first = req.body.first,
    last = req.body.last,
    email = req.body.email,
    data = {
      members: [{
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: first,
            LNAME: last
          }
        }]
      },
    options = {
      url: 'specific list',
      method: 'POST',
      headers: {
        'Authorization': 'nysa apikey'
      },
      body: JSON.stringify(data)
    };
  request(options, (error, response, body) => {
    console.log(response.statusCode);
    if (error) res.sendFile(__dirname + '/failure.html');
    else {
      if (response.statusCode === 200) {res.sendFile(__dirname + '/success.html');}
      else {res.sendFile(__dirname + '/failure.html');}
    }
  });
});

app.post('/failure', (req, res) => {
  res.redirect('/');
})

app.listen(process.env.PORT || 2020, () => {console.log('Server is running on port 2020')});
