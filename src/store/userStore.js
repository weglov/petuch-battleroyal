import config from '../config';


const { maxGames } = config;

const initialState = {
  gameIndex: 1,
  maxGames,
  endGameStatus: false,
  score: 0,
}

export default function gameStore(state = initialState, action) {
  switch (action.type) {
    case 'NEXT_GAME':
      return { ...state, gameIndex: ++state.gameIndex, score: action.data };
    case 'END_GAME':
      return { ...state, endGameStatus: true };
    case 'NEW_GAME':
      return { ...initialState };
    default:
      return state
  }
}