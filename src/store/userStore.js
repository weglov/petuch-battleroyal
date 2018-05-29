import ReactGA from 'react-ga';
import config from '../config';
import { pushScore } from '../utils';
import nanodelay from 'nanodelay';


export const SCREENS = {
  LOGIN: 'login',
  SIGNIN: 'signIn',
  GAME: 'game',
  LOADING: 'loading',
  CHOIZE: 'choize'
};

const { maxGames } = config;

const initialState = {
  gameIndex: 1,
  maxGames,
  endGameStatus: false,
  screen: SCREENS.LOADING,
  score: 0,
  token: '',
  customToken: '',
  auth: {},
  code: null,
  xpad: false,
}

export default function gameStore(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      ReactGA.set({ userId: action.user.uid });
      ReactGA.event({
        category: 'User',
        action: 'Auth'
      });
      const screen = SCREENS.CHOIZE;
  
      return { ...state, auth: action.user, code: action.code, screen };

    case 'AUTH_LOGOUT':
      ReactGA.event({
        category: 'User',
        action: 'Logout'
      })
      ReactGA.set({ userId: undefined});
      return { ...initialState, screen: SCREENS.SIGNIN };
    
    case 'AUTH_LOGIN_SCREEN':
      return { ...state, screen: SCREENS.LOGIN }

    case 'SAVE_CUSTOM_TOKEN':
      const customToken = action.token;

      return { ...state, customToken };

    case 'START_GAME_AT_SCREEN':
      return { ...state, screen: SCREENS.GAME }

    case 'SAVE_TOKEN':
      const token = `Bearer ${action.data}`;

      return { ...state, token };

    case 'G_NEXT_GAME':
      return { ...state, gameIndex: ++state.gameIndex, score: state.score + action.data };

    case 'G_END_GAME':
      const score = state.score + action.data;
      sendResult(score, state.token);
      ReactGA.event({
        category: 'User',
        action: 'End game'
      })
      return { ...state, endGameStatus: true, score };

    case 'G_NEW_GAME':
      ReactGA.event({
        category: 'User',
        action: 'New game'
      })
      return { ...state, gameIndex: 1, endGameStatus: false, score: 0, screen: SCREENS.GAME };

    case 'XPAD_CONNECT':
      return { ...state, xpad: true };

    default:
      return state
  }
}

async function sendResult(score, token) {
  let data = {score, atStand: false };

  if (process.env.REACT_APP_AT_STAND) {
    try {
      const secret = await import(/* webpackChunkName: "secretAPP" */ '../secret');
      data = Object.assign({}, data, secret.default);
    } catch (error) {

    }
  }

  const body = JSON.stringify(data);
  try {
    await pushScore({
      headers: { Authorization: token },
      method: 'POST',
      body,
    });
  } catch (error) {
    if (error === 'TypeError: Failed to fetch') {
      await nanodelay(2000);
      await sendResult(score, token);
    }
  }
}