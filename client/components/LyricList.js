import React, { Component } from 'react';

export default class LyricList extends Component {
  onLike(id) {
    console.log(id);
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <i
            onClick={() => this.onLike(id)}
            style={{ color: 'rgb(59, 150, 235)', cursor: 'pointer' }}
            className="material-icons"
          >
            thumb_up
          </i>
        </li>
      );
    });
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}
