import { cloneDeep, includes, indexOf } from 'lodash';
import { rotateBlock } from '../game/helpers';
import { connect } from './reduces';
import config from '../config';
import Game from '../game/Graph';

const initialState = {
  sets: [],
  matrix: [],
  paths: [],
  width: config.width,
  height: config.height,
  xpad: {
    x: 0,
    y: 0,
  }
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'G_NEW_GAME':
      return { ...state, ...newGame(state.width, state.height) };

    case 'G_INIT_GAME':
      return { ...state, ...newGame(state.width, state.height) };

    case 'G_ROTATE_BLOCK':
      const { rotateType } = config;
      const { block, position } = action;
      const type = block.type;
      const pos = indexOf(rotateType[type], position);
      const active = pos === rotateType[type].length - 1 ? rotateType[type][0] : rotateType[type][pos + 1];  
      const { sets, matrix } = rotateBlock(state, block, active);

      return { ...state, sets, matrix };
    case 'CONNECT_NODES':
      const { s, paths } = connect(state.sets, state.matrix, state.width);

      return { ...state, sets: s, paths }
    
    case 'X_XPAD_BUTTON':
      let xpad = state.xpad;
      const newSets =  cloneDeep(state.sets);

      if (!action.bool) {
        newSets[xpad.y + 1][xpad.x].gamepadActive = false;
        xpad = navigationXpad(action.button, state.xpad.x, state.xpad.y, state.width, state.height);
        newSets[xpad.y + 1][xpad.x].gamepadActive = true;
      }

      if (includes(['A'], action.button)) {
        app(state, { type: 'G_ROTATE_BLOCK', block: newSets[xpad.y + 1][xpad.x] })
      }

      return { ...state, xpad, sets: newSets };
    
    case 'XPAD_CONNECT':
      console.log(state.dispatch);
      return { ...state };
  
    default:
      return state
  }
}

function newGame(width, height) {
  return new Game(width, height);
}

function navigationXpad(action, x, y, width, height) {
  console.log(action, x, y, width, height);

  switch (action) {
    case 'DPadRight':
      return { x: x < width - 1 ? x + 1 : x, y };

    case 'DPadLeft':
      return { x: x !== 0 ? x - 1 : x, y };
    
    case 'DPadDown':
      return { x: x, y: y < height-1 ? y + 1 : y };
    
    case 'DPadUp':
      return { x: x, y: y !== 0 ? y - 1 : y };

    default:
      return { x, y }
  }
}
