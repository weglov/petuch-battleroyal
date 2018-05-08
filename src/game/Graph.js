import { createGame } from './createGame';
import { initMatrixAdjacency, rotateBlock } from './helpers';
import { printAllPaths } from './dfs';

class Graph {
  constructor(width, height) {
    const game = createGame(width, height);
    const vertex = width * (height + 2);

    this.width = width;
    this.height = height;
    this.sets = game;
    this.matrix = initMatrixAdjacency(vertex, this.sets);
  }

  get paths() {
    return printAllPaths(this.width, this.matrix);
  }

  rotate(block, position) {
    return rotateBlock(this, block, position);
  }
}

export default Graph;