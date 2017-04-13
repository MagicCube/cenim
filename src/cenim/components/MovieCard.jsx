import React from 'react';

import '../res/movie-card.less';

export default class MovieCard extends React.Component {
  handleClick() {
    if (typeof(this.props.onClick) === 'function') {
      this.props.onClick();
    }
  }

  renderDetails(movie) {
    if (!this.props.displayDetails) {
      return null;
    } else {
      if (!movie.directors) {
        return (<div className="loading">正在加载...</div>);
      } else {
        return (
          <div className="details" style={{width: window.innerWidth}}>
            <div className="row"><span className="caption">导演:</span> <span>{movie.directors.join(', ')}</span></div>
            <div className="row"><span className="caption">主演:</span> <span>{movie.casts.join(', ')}</span></div>
            <div className="row"><span className="caption">国家:</span> <span>{movie.countries.join(', ')}</span></div>
            <div className="row summary">
              <article>{movie.summary}</article>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    let { data } = this.props;
    if (!data) {
      data = {
        title: '正在加载，请稍后...',
        img: ''
      };
    }
    const details = this.renderDetails(data);
    return (
      <div className="cnm-movie-card" onClick={() => this.handleClick()} >
        <div className="cover" style={{ backgroundImage: `url(${data.img})` }} />
        <div className="bottom-bar">
          <div className="title">{data.title}</div>
          {data.recommendedBy ? <div className="recommendation">根据《{data.recommendedBy}》推荐</div> : null}
        </div>
        {details}
      </div>
    );
  }
}
