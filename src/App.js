import React, { Component } from 'react';
import Main from './components/Main';
import Loader from './components/Loader';
import Game from './game/Graph';
import config from './config';
import './assets/main.css';

const { width, height } = config;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Game(width, height),
    }
  }

  createGame = () => {
    const game = new Game(width, height);
    this.setState({ game: game });
  }

  render() {
    return (
      <div className="main">
        <Main game={this.state.game} next={this.createGame}/>
        <Loader />
      </div>
    );
  }
}

export default App;
