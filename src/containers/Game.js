import React, { Component } from 'react';
import app, { connectionNodes } from '../store';
import { createStore, applyMiddleware } from 'redux';
import Main from '../components/Main';
import Loader from '../components/Loader';

class App extends Component {
  next = () => this.props.store.dispatch({ type: 'G_INIT_GAME' })

  render() {
    return (
      <div className="main">
        <Main store={this.props.store} next={ this.next }/>
      </div>
    );
  }
}

export default App;
