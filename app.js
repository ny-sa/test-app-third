const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');

const app = new express();

app.listen(2020, () => {console.log('Server is running on port 2020')});