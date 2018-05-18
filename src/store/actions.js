export function rotateBlock(block, position) {
  return { type: 'G_ROTATE_BLOCK', block, position };
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
  return { type: 'G_NEW_GAME', data, };
}