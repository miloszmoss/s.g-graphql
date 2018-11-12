import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <i
              onClick={() => this.onLike(id, likes)}
              style={{ color: 'rgb(59, 150, 235)', cursor: 'pointer', paddingRight: '10px' }}
              className="material-icons"
            >
              thumb_up
            </i>
            <p style={{ minWidth: '20px' }}>{likes}</p>
          </span>
        </li>
      );
    });
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
export default graphql(mutation)(LyricList);
