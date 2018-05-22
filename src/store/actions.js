export function rotateBlock(block) {
  return { type: 'G_ROTATE_BLOCK', block };
}

export function connectNode(data) {
  return { type: 'CONNECT_NODES', data };
}

export function nextGame(data) {
  return { type: 'G_NEXT_GAME', data };
}

export function endGame(data) {
  return { type: 'G_END_GAME', data };
}

export function newGame(data) {
  return { type: 'G_NEW_GAME', data };
}

export function initGame() {
  return { type: 'G_INIT_GAME' };
}

export function hideScreen(data) {
  return { type: 'HIDE_SCREEN', data };
}