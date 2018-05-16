import React, { Component } from 'react';
import app, { connectionNodes } from './store';
import { createStore, applyMiddleware } from 'redux';
import Main from './components/Main';
import Loader from './components/Loader';
import Game from './game/Graph';
import config from './config';
import './assets/main.css';

const { width, height } = config;
const store = createStore(app, applyMiddleware(connectionNodes));
const initGame = () => {
  store.dispatch({
    type: 'INIT_GAME',
    data: new Game(width, height)
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    initGame();
  }

  render() {
    return (
      <div className="main">
        <Main store={store} next={initGame}/>
        <Loader text="START"/>
      </div>
    );
  }
}

export default App;
