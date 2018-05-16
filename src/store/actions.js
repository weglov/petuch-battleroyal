export function initGame(data) {
  return { type: 'INIT_GAME', data };
}

export function rotateBlock(block, position) {
  return { type: 'ROTATE_BLOCK', block, position };
}

export function connectNode(data) {
  return { type: 'CONNECT_NODES', data };
}

export function startGame(data) {
  return { type: 'NEXT_GAME' };
}

export function nextGame(data) {
  return { type: 'NEXT_GAME', data };
}

export function endGame(data) {
  return { type: 'END_GAME', data };
}