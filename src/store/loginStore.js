import config from '../config';

const initialState = {
  alphabet,
}

export default function loginStore(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case 'AUTH_USER':
      const screen = SCREENS.CHOIZE;
  
      return { ...state, auth: action.user, code: action.code, screen };

    default:
      return state
  }
}