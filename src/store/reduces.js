import { flatten, forEach, countBy, floor, cloneDeep } from 'lodash';
import { printAllPaths } from '../game/dfs';


export const connect = (sets, matrix, width) => {
  const paths = printAllPaths(width, matrix);
  const s = cloneDeep(sets);

  s.map(i => i.map((v) => {
    v.branches = null;

    return v;
  }));

  forEach(countBy(flatten(paths), Number), (v, k) => {
    const row = floor(k/width);
    if (s[row]) s[row][k % width].branches = v;
  });

  return { s, paths }
}