import React, { Component } from 'react';
import { getTopScore } from './utils';
import { delay } from 'lodash';


class TopScore extends Component {
  state = {
    users: [],
  }

  delayP = () => {
    delay(() => {
      getTopScore().then((v) => {
        this.setState({ users: v })
        this.delayP();
      });
    }, 5000);
  }

  componentDidMount() {
    getTopScore().then((v) => {
      this.setState({ users: v })
      this.delayP();
    });
  }

  get users() {
    return this.state.users.map((v, key) => 
      <li key={key} className="toplist-item">
        <div className="key">{++key}.</div>
        <div className="img-src" style={{ backgroundImage: `url(${v.picture}` }}></div>
        <div className="name">{v.name}<span className={v.at_stand ? 'at_stand' : ''}></span></div>
        <div className="score">{v.score}</div>
      </li>);
  }


  render() {
    return <div className="toplist">
      <h2>Топ-20:</h2>
      <ol>{ this.users }</ol>
    </div>
  }
};

export default TopScore;
