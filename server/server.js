'use strict';

const express = require('express');
const expressHandlebars = require('express-handlebars');
const requireHelpers = require('./lib/require-helpers');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const absolutePath = path.resolve(__dirname, '..');

const handlebars = expressHandlebars.create({
  partialsDir: path.resolve(absolutePath, 'templates', 'partials'),
  helpers: requireHelpers(path.resolve(absolutePath, 'templates', 'helpers')),
  extname: 'hbs',
});

app.use(cors());
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(absolutePath, 'templates'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// client rendering example
app.get('/', (req, res) => {
  res.render('layouts/index');
});

app.get('/api/todos', (req, res) => {
  res.status(200).json(todolist);
});

// server side rendering example
app.get('/ssr', (req, res) => {
  res.render('layouts/ssr', {
    data: todolist,
  });
});

app.listen(4001);

console.log('test!');