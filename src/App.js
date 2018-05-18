import React, { Component } from 'react';
import app, { connectionNodes } from './store';
import { createStore, applyMiddleware } from 'redux';
import Main from './components/Main';
import Loader from './components/Loader';
import './assets/main.css';

const store = createStore(app, applyMiddleware(connectionNodes));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
    }
  }

  newGame = () => {
    if (!this.state.start) {
      store.dispatch({ type: 'NEW_GAME' });
      store.dispatch({ type: 'INIT_GAME' });

      this.setState({ start: true });
    }
  }

  next = () => store.dispatch({ type: 'INIT_GAME' })

  render() {
    return (
      <div className="main">
        <Main store={store} next={ this.next }/>
        <Loader active={this.state.start} text="START" position="start" onClick={this.newGame}/>
      </div>
    );
  }
}

export default App;
