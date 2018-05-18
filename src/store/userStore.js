import config from '../config';


const { maxGames } = config;

const initialState = {
  gameIndex: 1,
  maxGames,
  endGameStatus: false,
  score: 0,
  auth: {}
}

export default function gameStore(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, auth: action.user };

    case 'G_NEXT_GAME':
      return { ...state, gameIndex: ++state.gameIndex, score: state.score + action.data };

    case 'G_END_GAME':
      return { ...state, endGameStatus: true, score: state.score + action.data  };

    case 'G_NEW_GAME':
      return { ...initialState };

    default:
      return state
  }
}