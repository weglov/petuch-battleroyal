import { flatten, forEach, countBy, floor } from 'lodash'; 
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
    const paths = printAllPaths(this.width, this.matrix);
    this.blockCount(paths);

    return paths;
  }

  clearCount() {
    flatten(this.sets).forEach(v => v.branches = null);
  }

  blockCount(p) {
    this.clearCount();

    forEach(countBy(flatten(p), Number), (v, k) => {
      const row = floor(k/this.width);
      if (this.sets[row]) this.sets[row][k % this.width].branches = v;
    });
  }

  rotate(block, position) {
    return rotateBlock(this, block, position);
  }
}

export default Graph;