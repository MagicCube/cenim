const mongoose = require('mongoose');

// Import all models
require('./models');

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(err);
});

mongoose.connection.once('open', () => {
  console.info('MongoDB is now connected.');
});
