import React, { Component } from 'react';
import firebase from 'firebase/app';
import Gamepad from 'react-gamepad';
import { buttons } from './store/gamepad';
import { connect } from 'react-redux';
import { get, delay } from 'lodash';
import { config } from './config';

import { api } from './utils';

import ChoizeScreen from './containers/ChoizeScreen';
import SignIn from './containers/SignIn';
import Game from './containers/Game';
import Loader from './components/Loader';
import Login from './containers/Login';


const { atStand } = config;
// Configure Firebase.
const configFirebase = {
  apiKey: "AIzaSyBrFhldIME9qfXLhyzlfax-1Nyk0w9r2E8",
  authDomain: "cloudpipeswin.firebaseapp.com",
  databaseURL: "https://cloudpipeswin.firebaseio.com",
  projectId: "cloudpipeswin",
  storageBucket: "cloudpipeswin.appspot.com",
  messagingSenderId: "23010356644"
};

firebase.initializeApp(configFirebase);

Gamepad.layouts.XBOX.buttons.push('RS');

class Main extends Component {
  store = this.props.store;
  SCREENS = this.props.screens;

  state = {
    startGame: false,
    loader: false,
  };

  authObserver = () => firebase.auth().onAuthStateChanged(
    (user) => {
      const self = this;

      if (user) {
        return user.getIdToken().then(function(data) {
          api('get-code', {
            headers: { Authorization: `Bearer ${data}` },
            method: 'GET', 
          }).then((code) => {
            self.store.dispatch({ type: 'AUTH_USER', user, code: code.code });
            self.store.dispatch({ type: 'SAVE_TOKEN', data });

            return self.setState({ loader: true });
          });
        });
      }

      self.store.dispatch({ type: 'AUTH_LOGOUT' });
      return this.setState({ loader: true });
    });

  standLogin = () => {
    delay(() => {
      this.store.dispatch({ type: 'AUTH_LOGIN_SCREEN' });
      this.setState({ loader: true });
    }, 2000)
  }

  signInWithCustomToken(token) {
    return firebase.auth().signInWithCustomToken(token);
  }

  componentDidMount = () => {
    if (atStand) {
      this.standLogin();
    } else {
      this.authObserver();
    }
  }

  startGame = () => {
    this.store.dispatch({ type: 'G_NEW_GAME' });
    this.store.dispatch({ type: 'G_INIT_GAME' });

    this.setState({ startGame: true, loader: true });
  }

  componentWillUnmount() {
    this.authObserver();
  }
  
  logout() {
    return firebase.auth().signOut().then(() => {
      window.location.href=window.location.href;
    });
  }

  app() {
    const { screen, code, store } = this.props;
    const SCREENS = this.props.screens;
    window.logout = this.logout;

    switch (screen) {
      case SCREENS.CHOIZE:
        return <ChoizeScreen store={store} start={this.startGame} code={ code } />

      case SCREENS.SIGNIN:
        return <SignIn store={store} />

      case SCREENS.LOGIN:
        return <Login store={store} signIn={this.signInWithCustomToken}/>
      
      case SCREENS.GAME:
        return <Game store={store} />

      default:
        return <SignIn store={store} />
    }
  }

  xpadButtonChange = (e, bool) => {
    const screen = this.props.screen;

    if (screen === 'game') {
      const activeHandler = get(buttons, e, buttons.DEFAULT);
      activeHandler(this.store, e, bool);
    }
  }

  render() {
    return (
      <Gamepad
        onButtonChange={this.xpadButtonChange}
        >
        <div className="main">
          <div className="app">
            { this.app() }
            <Loader active={this.state.loader} position='loader'>
              <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"/>
              </svg>
            </Loader>
          </div>
        </div>
      </Gamepad>
    )
  }
};

const mapStateToProps = state => {
  // const { sets, matrix, paths, nextScreen, endScreen } = state.game;
  const { screen, code } = state.user;

  return {
    screen,
    code
  }
};


export default connect(mapStateToProps)(Main);