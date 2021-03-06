const cors = require('cors');
const express = require('express');

const Rating = require('../models/Rating');
const movies = require('../../data/movies.json');
const clusters = require('../../data/clusters-25.json');

const router = express.Router();

const movieDict = new Map();
movies.forEach((movie) => {
  movieDict.set(movie.id, movie);
});

const movieIndex = [];
clusters.forEach((cluster, clusterIndex) => {
  cluster.movies.forEach((movie) => {
    movie.clusterIndex = clusterIndex;
    movieIndex.push(movie);
  });
});

router.use(cors());

router.get('/movie/index', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(movieIndex);
});

router.get('/movie/:id', (req, res) => {
  if (req.params.id && movieDict.has(req.params.id)) {
    console.log(`${req.session.id} viewed details of 《${movieDict.get(req.params.id).title}》.`);

    const m = movieDict.get(req.params.id);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
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

    const rating = new Rating({
      sessionId: req.session.id,
      movieId: m.id,
      value: 100
    });
    rating.save();
  } else {
    res.status(404).end();
  }
});

router.get('/rate/download', (req, res) => {
  Rating
    .find({})
    .select({ sessionId: 1, movieId: 1, value: 1, _id: 0 })
    .sort({ sessionId: 1 })
    .then((ratings) => {
      res.send(ratings);
    });
});

router.post('/rate', (req, res) => {
  if (Array.isArray(req.body)) {
    req.body.forEach((reqRating) => {
      reqRating.sessionId = req.session.id;
      const rating = new Rating(reqRating);
      rating.save();
      if (reqRating.value === 1) {
        console.log(`${reqRating.sessionId} liked 《${movieDict.get(reqRating.movieId).title}》.`);
      } else if (reqRating.value === -1) {
        console.log(`${reqRating.sessionId} disliked 《${movieDict.get(reqRating.movieId).title}》.`);
      } else {
        console.log(`${reqRating.sessionId} skiped 《${movieDict.get(reqRating.movieId).title}》.`);
      }
    });
  }
  res.send('OK');
});



router.get('/stats', (req, res) => {
  Promise.all([
    Rating.distinct('sessionId'),
    Rating.count()
  ]).then((values) => {
    res.send({
      sessions: values[0].length,
      ratings: values[1]
    });
  });
});

router.get('/top-:type', (req, res) => {
  let value = null;
  if (req.params.type === 'disliked') {
    value = -1;
  } else if (req.params.type === 'skipped') {
    value = 0;
  } else {
    value = 1;
  }
  Rating
    .aggregate([
      {
        $match: {
          value
        }
      },
      {
        $group: {
          _id: '$movieId',
          count: { $sum: 1 }
        }
      }
    ])
    .sort({ count: 'descending' })
    .limit(50)
    .then((results) => {
      results.forEach((result) => {
        const movieId = result._id;
        const m = movieDict.get(movieId);
        result.id = m.id;
        result.title = m.title;
        result.img = m.images.large;
        delete result._id;
      });
      res.send(results);
    });
});

module.exports = router;
