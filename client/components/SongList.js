import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';
import gql from 'graphql-tag';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch());
  }
  renderSongs() {
    const { songs, loading } = this.props.data;
    if (!loading) {
      return songs.map(song => (
        <li className="collection-item" key={song.id}>
          {song.title}
          <i
            onClick={() => this.onSongDelete(song.id)}
            style={{ cursor: 'pointer' }}
            className="material-icons"
          >
            delete
          </i>
        </li>
      ));
    } else {
      return <h4>Loading...</h4>;
    }
  }
  render() {
    return (
      <div>
        <h4>Your current song list</h4>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
