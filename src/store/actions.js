export function initGame(data) {
  return { type: 'INIT_GAME', data };
}

export function rotateBlock(block, position) {
  return { type: 'ROTATE_BLOCK', block, position };
}

export function connectNode(data) {
  return { type: 'CONNECT_NODES', data };
}