import React from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { dislikeMovie, getMovieDetails, getNextMovie, likeMovie, loadMovies, skipMovie } from '../api';
import MovieCard from '../components/MovieCard';

import '../index.html';
import '../res/index.less';
import '../res/app.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      displayDetails: false
    };
  }

  componentDidMount() {
    this.initialLoad();
  }

  async initialLoad() {
    await loadMovies();
    this.nextMovie();
  }

  nextMovie() {
    const movie = getNextMovie();
    this.setState({
      movie,
      displayDetails: false
    });
  }

  handleLikeMovie() {
    if (!this.state.movie) return;
    likeMovie(this.state.movie);
    this.nextMovie();
  }

  handleDislikeMovie() {
    if (!this.state.movie) return;
    dislikeMovie(this.state.movie);
    this.nextMovie();
  }

  handleSkipMovie() {
    if (!this.state.movie) return;
    skipMovie(this.state.movie);
    this.nextMovie();
  }

  handleMovieCardClick() {
    this.setState(state => ({
      displayDetails: !state.displayDetails
    }), async () => {
      if (this.state.displayDetails && this.state.movie) {
        const details = await getMovieDetails(this.state.movie.id);
        this.setState({
          movie: details
        });
      }
    });
  }

  render() {
    const movies = [];
    if (this.state.movie) {
      movies.push(this.state.movie);
    }
    const movieCards = movies.map(movie => (
      <MovieCard
        key={movie.id}
        data={movie}
        displayDetails={this.state.displayDetails}
        onClick={() => this.handleMovieCardClick()}
      />
    ));
    return (
      <div className="cnm-app">
        <main className={this.state.displayDetails ? 'detailed' : null} >
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {movieCards}
          </ReactCSSTransitionGroup>
        </main>
        <footer>
          <div className="button-bar">
            <div className="buttons">
              <button className="skip" onClick={() => this.handleSkipMovie()}>没看过</button>
              <button className="dislike" onClick={() => this.handleDislikeMovie()}>一般般</button>
              <button className="like" onClick={() => this.handleLikeMovie()}>喜欢</button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('cnm-root')
);
