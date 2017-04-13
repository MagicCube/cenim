const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');

const devMode = process.env.NODE_ENV !== 'production';
console.log(`Running in ${devMode ? 'DEV' : 'PRODUCTION'} mode.`);

// Setup Mongoose.
require('../db/mongoose/setup');
const url = process.env.MONGODB_CONNECTION ? `mongodb://${process.env.MONGODB_CONNECTION}` : 'mongodb://localhost/cenim';
mongoose.connect(url);

// Instantialize express.
const app = express();

// Add HTTP body parsers.
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add cookie and session support.
app.use(cookieParser());
const MongoStore = connectMongo(session);
app.use(session({
  secret: 'i$love%cenim!',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


if (devMode) {
  // Add Webpack
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../../webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, webpackConfig.devServer));
} else {
  app.use(express.static('public'));
}

app.use('/data', express.static('data'));
app.use('/api', require('../api'));

module.exports = app;
