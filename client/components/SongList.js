import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SongList extends Component {
  renderSongs() {
    const { songs, loading } = this.props.data;
    if (!loading) {
      return songs.map(song => (
        <li className="collection-item" key={song.id}>
          {song.title}
        </li>
      ));
    } else {
      return <h4>Loading...</h4>;
    }
  }
  render() {
    return <ul className="collection">{this.renderSongs()}</ul>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
