const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var swords = require('./routes/swords');

app.use('/api/swords', swords);

app.listen(process.env.PORT || 8080);
console.log('Server is running!');