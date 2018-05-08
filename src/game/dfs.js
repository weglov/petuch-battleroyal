import { size, times, constant, cloneDeep } from 'lodash';


export const convertEdge = (matrix) => {
  const res = matrix.reduce((path, v, k) => {
    path[k] = v.reduce((r, val, key) => {
      if (val === 1) r.push(key);

      return r;
    }, []);

    return path;
  }, {});

  return res;
}

export const dfs = (graph, u, d, visited, path, paths) => {
  visited[u] = true;
  path.push(u);

  if (u === d) {
    paths.push(cloneDeep(path));
  } else {
    for (let i in graph[u]) {
      const x = graph[u][i];
      if (visited[x] === false) {
        dfs(graph, x, d, visited, path, paths)
      }
    }
  }

  path.pop()
  visited[u] = false;

  return paths;
}

export const printAllPaths = (w, matrix) => {
  const graph = convertEdge(matrix);
  const last = matrix.length;

  graph.x = times(w, Number);
  times(w, v => graph[last - (v + 1)].push(last));

  const visited = times(size(graph), constant(false));
  const path = [];

  return dfs(graph, 'x', last, visited, path, []);
}
