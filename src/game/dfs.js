import { size, times, constant, cloneDeep } from 'lodash';


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

export const printAllPaths = (graph) => {
  console.log(graph);
  const last = 12
  graph.x = [0, 1, 2];
  // graph[last] = [9, 10, 11];
  graph[9].push(last)
  graph[10].push(last)
  graph[11].push(last) 
  const visited = times(size(graph), constant(false));
  const path = [];

  return dfs(graph, 'x', last, visited, path, []);
}
