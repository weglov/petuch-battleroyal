import { random, sample, times } from 'lodash';
import { initMatrixAdjacency, rotateBlock } from './game';
import { printAllPaths } from './dfs';
import config from '../config';


const { rotateType } = config;

function parentBlock(x, y, name, type = 'chiken') {
  return {
    name,
    node: true,
    xy: {x, y},
    position: rotateType[1][1],
    type,
  }
};


export function createGame(width, height) {
  let sets = [];
  let name = 0;

  for (let y = 0; y < height; y++) {
    sets[y] = [];
  
    for (let x = 0; x < width; x++) {
      name = ++name;
      const type = random(3, 3);
      const position = sample(rotateType[type]);
      const xy = {x, y: y + 1};

      sets[y][x] = {
        name: name,
        node: false,
        xy, 
        position,
        type,
        rotateBlock,
      }
    }
  }

  sets.unshift(times(width, (v) => parentBlock(v, 0, `x${v}`)));
  sets.push(times(width, (v) => parentBlock(v, height + 1, `y${v}`, 'pig')));

  const matrix = initMatrixAdjacency(width * (height + 2), sets);

  return { sets: sets, matrix, paths: [] };
};

export default createGame;
