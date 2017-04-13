const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  sessionId: { type: String, index: true },
  movieId: { type: String, index: true },
  like: { type: Boolean },
  dislike: { type: Boolean },
  createTime: { type: Date, default: Date.now }
}, {
  collection: 'log',
});

schema.statics.findBySessionId = function findBySessionId(sessionId, cb) {
  return this.findOne({ sessionId }, cb);
};

module.exports = mongoose.model('Log', schema);
