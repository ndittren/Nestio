const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, './public')));

app.use('/api', require('./api'));

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
