import { get, post } from '../http/client';


let _movies = [];
let _movieList = [];
let _recommendationList = [];
const _ratings = [];
let _postTimer = null;


export async function loadMovies() {
  _movies = await get('/api/movie/index');
  resetMovieList();
}

function resetMovieList() {
  _movieList = _movies.slice(0);
  shuffleMovieList();
  _recommendationList.splice(0, _recommendationList.length);
}

function shuffleMovieList() {
  _movieList.sort(() => Math.random() - 0.5);
}


export async function getMovieDetails(id) {
  const details = await get(`/api/movie/${id}`);
  return details;
}

export function getNextMovie() {
  let movie = _recommendationList.pop();
  if (!movie) {
    movie = _movieList.pop();
  }
  if (!movie) {
    resetMovieList();
    return getNextMovie();
  }
  console.log(`total: ${_movieList.length + _recommendationList.length}, movieList: ${_movieList.length}, recommendationList: ${_recommendationList.length}`);
  return movie;
}

export function likeMovie(movie) {
  rate(movie, 1);
  if (_recommendationList.length === 0 || _recommendationList[0].clusterIndex !== movie.clusterIndex) {
    const filterIds = [];
    _movieList.forEach((m) => {
      if (m.clusterIndex === movie.clusterIndex) {
        m.recommendedBy = movie.title;
        _recommendationList.push(m);
        filterIds.push(m.id);
      }
    });
    if (filterIds.length > 0) {
      _movieList = _movieList.filter(m => filterIds.indexOf(m.id) === -1);
    }
  }
}

export function dislikeMovie(movie) {
  rate(movie, -1);
  setTimeout(() => {
    if (_recommendationList.length > 0) {
      _recommendationList.forEach((m) => {
        m.recommendedBy = null;
        _movieList.push(m);
      });
      shuffleMovieList();
      _recommendationList.splice(0, _recommendationList.length);
    }
  });
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
