const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  sessionId: { type: String, index: true },
  movieId: { type: String, index: true },
  value: { type: Number, index: true },
  createTime: { type: Date, default: Date.now }
}, {
  collection: 'rating',
});

schema.statics.findBySessionId = function findBySessionId(sessionId, cb) {
  return this.findOne({ sessionId }, cb);
};

module.exports = mongoose.model('Rating', schema);
