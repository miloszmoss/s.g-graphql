import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }

    return (
      <div>
        <Link
          className="center-align"
          to="/"
          style={{ display: 'flex', paddingTop: '10px', alignItems: 'center' }}
        >
          <i className="material-icons">navigate_before</i>
          Back
        </Link>
        <h3>Song title: {song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}
export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
