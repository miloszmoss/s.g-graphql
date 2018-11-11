import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }
  onSubmit(e) {
    e.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
    });
    this.setState({ content: '' });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="">Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={e => {
            this.setState({ content: e.target.value });
          }}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
