import { rotateBlock } from '../game/helpers';
import { connect } from './reduces';
import config from '../config';

const initialState = {
  sets: [],
  matrix: [],
  paths: [],
  width: config.width,
  height: config.height,
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'INIT_GAME':
      return { ...state, ...action.data };
    case 'ROTATE_BLOCK':
      const { block, position } = action;
      const { sets, matrix } = rotateBlock(state, block, position);

      return { ...state, sets, matrix };
    case 'CONNECT_NODES':
      const { s, paths } = connect(state.sets, state.matrix, state.width);

      return { ...state, sets: s, paths }
    default:
      return state
  }
}