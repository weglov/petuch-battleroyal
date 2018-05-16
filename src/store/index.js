import { combineReducers } from 'redux';
import { connectNode } from './actions';
import user from './userStore';
import game from './gameStore';



export default combineReducers({
  game,
  user
})


export const connectionNodes = store => next => action => {
  let result = next(action);

  if (action.type !== 'CONNECT_NODES') {
    store.dispatch(connectNode());
  }

  return result
}