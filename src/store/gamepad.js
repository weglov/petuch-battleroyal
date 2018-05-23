import { rotateBlock, nextGame, initGame, hideScreen, endGame, newGame } from './actions';
import { delay } from 'lodash';


export const connect = number => ({ type: 'XPAD_CONNECT', number });

export const onDpadChange = (button, bool) => ({ type: 'X_XPAD_DPAD', button, bool });
export const onDpadActive = (button, bool) => ({ type: 'X_XPAD_A', button, bool });

export const buttons = {
  'DPadLeft': (store, e, bool) => store.dispatch(onDpadChange(e, bool)),
  'DPadUp': (store, e, bool) => store.dispatch(onDpadChange(e, bool)),
  'DPadRight': (store, e, bool) => store.dispatch(onDpadChange(e, bool)),
  'DPadDown': (store, e, bool) => store.dispatch(onDpadChange(e, bool)),
  'A': (store, e, bool) => {
    const { xpad, sets } = store.getState().game;
    const block = sets[xpad.y + 1][xpad.x];

    if (bool) {
      store.dispatch(rotateBlock(block));
      store.dispatch(onDpadActive(block));
    }
  },
  'B': (store, e, bool) => {
    console.log('store', store, e, bool);
    const state = store.getState();

    if (bool) {
      nextGameHandler(store, state)
    }
  },
  'DEFAULT': (store, e, bool) => console.log(e),
  'Start': (store, e, bool) => newGameHandler(store),
}

const xpad = {
  connect,
  onDpadChange,
}

function newGameHandler(store) {
  store.dispatch(newGame());
  store.dispatch(initGame());
};

function nextGameHandler(store, state) {
  console.log(state);

  const { gameIndex, maxGames, endGameStatus } = state.user;
  const { paths, nextScreen } = state.game;

  if (gameIndex < maxGames && !nextScreen) {
    console.log(store);
    store.dispatch(nextGame(paths.length));
    delay(() => store.dispatch(initGame()), 1500);
    delay(() => store.dispatch(hideScreen()), 3000);
  }

  if (!endGameStatus && (gameIndex === maxGames)) {
    store.dispatch(endGame(paths.length));
  }
}

export default xpad;