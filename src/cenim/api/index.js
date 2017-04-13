import { get, post } from '../http/client';

let _movies = [];
let _movieStack = [];

export function getNextMovie() {
  const movie = _movieStack.pop();
  if (!movie) {
    _movieStack = _movies.slice(0);
    return getNextMovie();
  }
  return movie;
}

export async function loadMovies() {
  _movies = await get('/data/index.json');
  _movies = _movies.sort(() => Math.random() - 0.5);
  _movieStack = _movies.slice(0);
}
