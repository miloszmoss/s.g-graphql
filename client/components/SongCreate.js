import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SongCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }
  onInputChange(e) {
    this.setState({ title: e.target.value });
  }
  onFormSubmit(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
    });

    this.setState({ title: '' });
  }
  render() {
    return (
      <div>
        <h3>Create a new song</h3>
        <form action="" onSubmit={this.onFormSubmit.bind(this)}>
          <label>Song Title:</label>
          <input onChange={this.onInputChange.bind(this)} type="text" value={this.state.title} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
