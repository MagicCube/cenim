const express = require('express');
const request = require('request-promise-native');

const Rating = require('../models/Rating');

const router = express.Router();

router.get('/movie/:id', (req, res) => {
  if (req.params.id) {
    request.get(`http://api.douban.com/v2/movie/subject/${req.params.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`, { json: true }).then(
      (m) => {
        try {
          res.send({
            id: m.id,
            title: `${m.title} (${m.year})`,
            img: m.images.large ? m.images.large : null,
            genres: m.genres,
            countries: m.countries,
            casts: m.casts.map(p => p.name),
            directors: m.directors.map(p => p.name),
            summary: m.summary
          });
        } catch (err) {
          console.error(err);
          res.status(500).end();
        }
      },
      (err) => {
        console.error(err);
        res.status(500).end();
      }
    );
  } else {
    res.status(404).end();
  }
});

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
