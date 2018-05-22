import config from '../config';
import { pushScore } from '../utils';

const { maxGames } = config;

const initialState = {
  gameIndex: 1,
  maxGames,
  endGameStatus: false,
  activeScreen: 'login',
  score: 0,
  token: '',
  auth: {},
  code: null,
  xpad: false
}

export default function gameStore(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, auth: action.user, code: action.code };

    case 'SAVE_TOKEN':
      const token = `Bearer ${action.data}`;

      return { ...state, token };

    case 'G_NEXT_GAME':
      return { ...state, gameIndex: ++state.gameIndex, score: state.score + action.data };

    case 'G_END_GAME':
      const score = state.score + action.data;
      const body = JSON.stringify({
        score,
        atStand: false,  
      });

      pushScore({
        headers: { Authorization: state.token },
        method: 'POST',
        body,
      });
  
      return { ...state, endGameStatus: true, score };

    case 'G_NEW_GAME':
      return { ...state, gameIndex: 1, endGameStatus: false, score: 0 };

    case 'XPAD_CONNECT':
      return { ...state, xpad: true };

    default:
      return state
  }
}