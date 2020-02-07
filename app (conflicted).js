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
        }]},
    options = {
      url: 'https://us4.api.mailchimp.com/3.0/lists/07fb08d655',
      headers: {
        'Authorization':'nysa f7ba6e2a98dc0871a499704785168200-us4'
      },
      //body: JSON.stringify(data)
    };
  request(options, (error, response, body) => {
    if (error) res.sendFile(__dirname + '/failure.html');
    else if (response.statusCode === 200) res.sendFile(__dirname + '/success.html');
    else res.sendFile(__dirname + '/failure.html');
  });

})

app.listen(2020, () => {console.log('Server is running on port 2020')});