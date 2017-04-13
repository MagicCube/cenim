const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const Rating = require('../models/Rating');
const router = express.Router();

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
