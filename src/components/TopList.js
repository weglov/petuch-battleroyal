import React, { Component } from 'react';
import { getTopScore } from '../utils';

class TopList extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    getTopScore(this.props.token).then((v) => {
      this.setState({ users: v })
    });
  }

  get users() {
    return this.state.users.map((v, key) => <li key={key}><span>{v.name}</span><span className="score">{v.score}</span></li>);
  }


  render() {
    return <div className="toplist">
      <h2>Топ-10 лучших игроков:</h2>
      <ol>{ this.users }</ol>
    </div>
  }
};

export default TopList;
