import React from 'react';

import '../res/movie-card.less';

export default function MovieCard(props) {
  let { data } = props;
  if (!data) {
    data = {
      title: '正在加载，请稍后...',
      img: ''
    };
  }
  return (
    <div className="cnm-movie-card">
      <div className="cover" style={{ backgroundImage: `url(${data.img})` }} />
      <div className="bottom-bar">
        <div className="title">{data.title}</div>
      </div>
    </div>
  );
}
