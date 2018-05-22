import { startsWith } from 'lodash';
import { combineReducers } from 'redux';
import { connectNode } from './actions';
import user from './userStore';
import game from './gameStore';


export default combineReducers({
  game,
  user
});

export const connectionNodes = store => next => action => {
  let result = next(action);

  if (startsWith(action.type, 'G_')) {
    store.dispatch(connectNode());
  }

  return result;
}