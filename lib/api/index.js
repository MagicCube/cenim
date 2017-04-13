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


router.get('/movie/index', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(movieIndex);
});

router.get('/movie/:id', (req, res) => {
  if (req.params.id && movieDict.has(req.params.id)) {
    console.log(`${req.session.id} touched 《${movieDict.get(req.params.id).title}》.`);

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
  Rating.find({}).then((ratings) => {
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

module.exports = router;
