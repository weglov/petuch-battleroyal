import React, { Component } from 'react';
import Main from './components/Main';
import { createGame } from './game';
import './assets/App.css';

const game = createGame();

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
