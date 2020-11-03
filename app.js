const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const { PORT } = process.env;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});