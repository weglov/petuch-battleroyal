export const connect = number => ({ type: 'XPAD_CONNECT', number });

export const onButtonChange = (button, bool) => ({ type: 'X_XPAD_BUTTON', button, bool });

const xpad = {
  connect,
  onButtonChange,
}

export default xpad;