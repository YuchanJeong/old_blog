function solution(n, paths, gates, summits) {
  const graph = new Array(n + 1).fill(0).map(() => new Array());
  paths.forEach((path) => {
    const [i, j, w] = path;
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  });

  const targets = [];
  for (let gate of gates) {
    for (summit of summits) {
      targets.push([gate, summit]);
    }
  }

  const result = [];

  targets.forEach((target) => {
    const [start_gate, summit] = target;
    const rest_gate = gates.filter((gate) => gate !== start_gate);
    const rest_summit = summits.filter((_summit) => _summit !== summit);

    const stack = [[start_gate, 0, []]];
    while (stack.length > 0) {
      const [edge, w, visited] = stack.pop();

      if (edge === summit) {
        result.push([summit, w]);
      }

      graph[edge].forEach((next) => {
        if (rest_gate.includes(next[0])) return;
        if (rest_summit.includes(next[0])) return;
        if (visited.includes(next[0])) return;
        stack.push([next[0], Math.max(w, next[1]), [...visited, edge]]);
      });
    }
  });
  return result.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  })[0];
}

console.log(
  "#1",
  [5, 3],
  solution(
    6,
    [
      [1, 2, 3],
      [2, 3, 5],
      [2, 4, 2],
      [2, 5, 4],
      [3, 4, 4],
      [4, 5, 3],
      [4, 6, 1],
      [5, 6, 1],
    ],
    [1, 3],
    [5]
  )
);
console.log(
  "#2",
  [3, 4],
  solution(
    7,
    [
      [1, 4, 4],
      [1, 6, 1],
      [1, 7, 3],
      [2, 5, 2],
      [3, 7, 4],
      [5, 6, 6],
    ],
    [1],
    [2, 3, 4]
  )
);
console.log(
  "#3",
  [5, 1],
  solution(
    7,
    [
      [1, 2, 5],
      [1, 4, 1],
      [2, 3, 1],
      [2, 6, 7],
      [4, 5, 1],
      [5, 6, 1],
      [6, 7, 1],
    ],
    [3, 7],
    [1, 5]
  )
);
console.log(
  "#4",
  [5, 6],
  solution(
    5,
    [
      [1, 3, 10],
      [1, 4, 20],
      [2, 3, 4],
      [2, 4, 6],
      [3, 5, 20],
      [4, 5, 6],
    ],
    [1, 2],
    [5]
  )
);
