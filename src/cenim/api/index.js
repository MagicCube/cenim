import { get, post } from '../http/client';


let _movies = [];
let _movieStack = [];
const _ratings = [];
let _postTimer = null;


export async function loadMovies() {
  _movies = await get('/data/index.json');
  _movies = _movies.sort(() => Math.random() - 0.5);
  _movieStack = _movies.slice(0);
}

export async function getMovieDetails(id) {
  const details = await get(`/api/movie/${id}`);
  return details;
}

export function getNextMovie() {
  const movie = _movieStack.pop();
  if (!movie) {
    _movieStack = _movies.slice(0);
    return getNextMovie();
  }
  return movie;
}

export function likeMovie(movie) {
  rate(movie, 1);
}

export function dislikeMovie(movie) {
  rate(movie, -1);
}

export function skipMovie(movie) {
  rate(movie, 0);
}

function rate(movie, value) {
  if (_postTimer) {
    clearTimeout(_postTimer);
    _postTimer = null;
  }
  _ratings.push({
    movieId: movie.id,
    value
  });

  if (_ratings.length >= 5) {
    postRatings();
  } else {
    _postTimer = setTimeout(() => {
      postRatings();
    }, 2000);
  }
}


function postRatings() {
  if (_postTimer) {
    clearTimeout(_postTimer);
    _postTimer = null;
  }
  const ratings = _ratings.splice(0);
  if (ratings.length) {
    post('/api/rate', ratings);
    _ratings.splice(0, _ratings.length);
  }
}
window.onbeforeunload = postRatings;
