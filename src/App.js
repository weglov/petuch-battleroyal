import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Main from './Main';


import './assets/main.css';
import './assets/auth.css';
import './assets/loader.css';
import './assets/media.css';

import config from './config';

import app, { connectionNodes, SCREENS } from './store';
import { createStore, applyMiddleware } from 'redux';
const store = createStore(app, applyMiddleware(connectionNodes));
const { gaTrackingID } = config;

ReactGA.initialize(gaTrackingID, { debug: true });

class App extends Component {
  render() {
    return <Main store={store} screens={SCREENS}/>
  }
};

export default App;
