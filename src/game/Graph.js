import { createGame } from './createGame';
import { initMatrixAdjacency } from './helpers';

class Graph {
  constructor(width, height) {
    const game = createGame(width, height);
    const vertex = width * (height + 2);

    this.width = width;
    this.height = height;
    this.sets = game;
    this.matrix = initMatrixAdjacency(vertex, this.sets);
  }
}

export default Graph;