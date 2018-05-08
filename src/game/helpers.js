import { times, constant, flatten, forEach, toNumber, findIndex } from 'lodash';
import config from '../config';


const { width, connections } = config;

const checkConnections = (v, child, type) => {
  const sync = v.position.charAt(connections[type][0]) === '1' && child.position.charAt(connections[type][1]) === '1';

  return toNumber(sync);
};

const getNeighbors = (k) => {
  const left = k % width === 0 ? -1 : k - 1;
  const right = (k + 1) % width === 0 ? -1 : k + 1;
  const top = k - width;
  const bottom = k + width;

  return { left, top, right, bottom };
}

export const rotateBlock = (game, block, position) => {
  const { xy, name } = block;
  game.sets[xy.y][xy.x].position = position;

  const flattenGame = flatten(game.sets);
  const k = findIndex(flattenGame, { name });

  forEach(getNeighbors(k), (value, type) => {
    if (value !== -1) {
      game.matrix[k][value] = checkConnections(flattenGame[k], flattenGame[value], type);
      game.matrix[value][k] = checkConnections(flattenGame[k], flattenGame[value], type);
    }
  });

  return game;
};

export const initMatrixAdjacency = (v, matrix) => {
  let result = [];
  times(v, () => result.push(times(v, constant(0))));
  const array = flatten(matrix);

  array.forEach((v, k) => {
    forEach(getNeighbors(k), (value, type) => {
      if (value >= 0 && value < array.length) {
        result[k][value] = checkConnections(v, array[value], type);
      }
    });
  });

  return result;
}

export default initMatrixAdjacency;