const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const morgan = require( 'morgan' );
const routes = require( './routes/api' );

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

// ......our error middleware.......

app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

module.exports = app;

module.exports = app;
