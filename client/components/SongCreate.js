import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

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
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query }],
      })
      .then(() => hashHistory.push('/'));
  }
  render() {
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
        <h3>Create a new song</h3>
        <form action="" onSubmit={this.onFormSubmit.bind(this)}>
          <label>Song Title:</label>
          <input onChange={this.onInputChange.bind(this)} type="text" value={this.state.title} />
          <button className="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i className="material-icons right">send</i>
          </button>
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
