const express = require('express');

const Rating = require('../models/Rating');

const router = express.Router();

router.get('/rate/download', (req, res) => {
  Rating.find({}).then((ratings) => {
    res.send(ratings);
  });
});

router.post('/rate', (req, res) => {
  if (Array.isArray(req.body)) {
    req.body.forEach((reqRating) => {
      reqRating.sessionId = req.session.id;
      const rating = new Rating(reqRating);
      console.log(`${reqRating.sessionId} rate ${reqRating.movieId} as ${reqRating.value}.`);
      rating.save();
    });
  }
  res.send('OK');
});

module.exports = router;
