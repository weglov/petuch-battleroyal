import React, { Component } from 'react';
import Main from './components/Main';
import Game from './game/Game';
import config from './config';
import './assets/App.css';

const { width, height } = config;
const game = new Game(width, height);
window.game = game;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main game={game}/>
      </div>
    );
  }
}

export default App;
