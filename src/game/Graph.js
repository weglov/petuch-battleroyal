import { createGame } from './index';
import { initMatrixAdjacency, rotateBlock } from './game';

class Graph {
  constructor(width, height) {
    const game = createGame();

    this.sets = game;
    this.matrix = this.initMatrixAdjacency(width * (height + 2), this.sets);
    // this.paths = this.
  }
}