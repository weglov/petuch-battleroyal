import React, { Component } from 'react';
import Main from './Main';

import './assets/main.css';
import './assets/auth.css';
import './assets/loader.css';
import './assets/media.css';

import app, { connectionNodes, SCREENS } from './store';
import { createStore, applyMiddleware } from 'redux';
const store = createStore(app, applyMiddleware(connectionNodes));

class App extends Component {
  render() {
    return <Main store={store} screens={SCREENS}/>
  }
};

export default App;
