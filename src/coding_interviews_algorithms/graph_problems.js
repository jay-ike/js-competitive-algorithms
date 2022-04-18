require("../utils");

function directedGraphTopologicalOrder(
  adjacencyList,
  source,
  inDegree,
  maxSourcePerIteration = Number.MAX_SAFE_INTEGER,
  equalityCheck = null
) {
  var sortedOrder = [];
  while (source.length > 0) {
    if (source.length > maxSourcePerIteration) break;
    let root = source.shift();
    sortedOrder.push(root);
    if (
      typeof equalityCheck === "function" &&
      equalityCheck(sortedOrder) === false
    )
      break;
    adjacencyList[root].forEach((child) => {
      inDegree.decrementKeyValue(child, { step: 1, deleteIfZero: false });
      if (inDegree[child] === 0) source.push(child);
    });
  }
  return sortedOrder;
}
function directedGraphDetailsFromEdges(edges) {
  var inDegree = {},
    adjacency = {};
  edges.forEach((edge) => {
    let [parent, child] = edge;
    if (adjacency[parent] == null) adjacency[parent] = [child];
    else adjacency[parent].push(child);
    if (adjacency[child] == null) adjacency[child] = [];
    if (inDegree[parent] == null) inDegree[parent] = 0;
    inDegree.incrementKeyValue(child);
  });
  return [inDegree, adjacency];
}
function topologicalSort(vertices, edges) {
  var source = [],
    [inDegree, adjacency] = directedGraphDetailsFromEdges(edges);
  source = Object.keys(inDegree)
    .filter((key) => inDegree[key] === 0)
    .map((key) => Number.parseInt(key));
  return directedGraphTopologicalOrder(adjacency, source, inDegree);
}
function scheduleTaskWithPrerequisites(prerequisites) {
  var source = [],
    [inDegree, adjacencyList] = directedGraphDetailsFromEdges(prerequisites);
  source = Object.keys(inDegree)
    .filter((key) => inDegree[key] === 0)
    .map((key) => Number.parseInt(key));
  let sortedOrder = directedGraphTopologicalOrder(
    adjacencyList,
    source,
    inDegree
  );
  return [sortedOrder, Object.keys(inDegree).length];
}
function canBeScheduled(prerequisites) {
  let [sortedOrder, allVertices] = scheduleTaskWithPrerequisites(prerequisites);
  return sortedOrder.length === allVertices;
}
function schedulingOrderToFinishTasks(prerequisites) {
  let [sortedOrder, allVertices] = scheduleTaskWithPrerequisites(prerequisites);
  return sortedOrder.length === allVertices ? sortedOrder : [];
}
function allPossibleScheduling(prerequisites) {
  var [inDegree, adjacencyList] = directedGraphDetailsFromEdges(prerequisites),
    result = [];
  let source = Object.keys(inDegree)
    .filter((key) => inDegree[key] === 0)
    .map((key) => Number.parseInt(key));
  recursiveTopologicalSort(source, inDegree, adjacencyList, [], (order) =>
    result.push(order)
  );
  return result;
}
function recursiveTopologicalSort(
  source,
  inDegree,
  adjacencyList,
  sortedOrder,
  onOrderFound
) {
  if (source.length > 0) {
    for (let i = 0; i < source.length; i++) {
      let node = source[i];
      sortedOrder.push(node);
      const nextSource = [...source];
      nextSource.splice(i, 1);
      adjacencyList[node].forEach((child) => {
        inDegree.decrementKeyValue(child, { deleteIfZero: false, step: 1 });
        if (inDegree[child] === 0) nextSource.push(child);
      });
      recursiveTopologicalSort(
        nextSource,
        inDegree,
        adjacencyList,
        sortedOrder,
        onOrderFound
      );
      sortedOrder.pop();
      for (let i = 0; i < adjacencyList[node].length; i++)
        inDegree.incrementKeyValue(adjacencyList[node][i]);
    }
  }
  if (sortedOrder.length === Object.keys(inDegree).length)
    onOrderFound([...sortedOrder]);
}
function characterOrderGivenSortedWords(words) {
  if (words.length <= 1) return [];
  var orders = {};
  for (let i = 1; i < words.length; i++) {
    let minLength = Math.min(words[i].length, words[i - 1].length);
    for (let j = 0; j < minLength; j++) {
      let prevWordChar = words[i - 1][j],
        currentWordChar = words[i][j],
        key = `${prevWordChar}${currentWordChar}`;
      if (prevWordChar !== currentWordChar) {
        if (orders[key] == null) orders[key] = [prevWordChar, currentWordChar];
        break;
      }
    }
  }
  let [inDegree, adjacencyList] = directedGraphDetailsFromEdges(
      Object.values(orders)
    ),
    source = Object.keys(inDegree).filter((key) => inDegree[key] === 0),
    order = directedGraphTopologicalOrder(adjacencyList, source, inDegree);
  return order.length === Object.keys(inDegree).length ? order : [];
}
function canReconstructOriginalSequenceFromSequences(
  originalSequence,
  sequences
) {
  var dependencies = [];
  for (let i = 0; i < sequences.length; i++) {
    if (sequences[i].length === 2) dependencies.push(sequences[i]);
    else if (sequences[i].length > 2) {
      for (let j = 1; j < sequences[i].length; j++) {
        dependencies.push([sequences[i][j - 1], sequences[i][j]]);
      }
    }
  }
  let [inDegree, adjacencyList] = directedGraphDetailsFromEdges(dependencies),
    source = Object.keys(inDegree)
      .filter((key) => inDegree[key] === 0)
      .map(Number.parseInt),
    order = directedGraphTopologicalOrder(
      adjacencyList,
      source,
      inDegree,
      1,
      (sortedOrder) => {
        let lastIndex = sortedOrder.length - 1;
        return originalSequence[lastIndex] === sortedOrder[lastIndex];
      }
    );
  return order.length === originalSequence.length;
}
function allRootsForMinimumHeightTrees(edges) {
  var adjacencies = {},
    inDegree = {},
    leaves = [];
  for (let i = 0; i < edges.length; i++) {
    let [node1, node2] = edges[i];
    if (adjacencies[node1] == null) adjacencies[node1] = [node2];
    else adjacencies[node1].push(node2);
    if (adjacencies[node2] == null) adjacencies[node2] = [node1];
    else adjacencies[node2].push(node1);
    inDegree.incrementKeyValue(node1);
    inDegree.incrementKeyValue(node2);
  }
  leaves = Object.keys(inDegree)
    .map((key) => Number.parseInt(key))
    .filter((key) => inDegree[key] === 1);
  while (Object.keys(inDegree).length > 2) {
    let leaveSize = leaves.length;
    for (let i = 0; i < leaveSize; i++) {
      let node = leaves.shift();
      inDegree.decrementKeyValue(node, { step: 1, deleteIfZero: true });
      adjacencies[node].forEach((key) => {
        inDegree.decrementKeyValue(key, { step: 1, deleteIfZero: true });
        if (inDegree[key] === 1) leaves.push(key);
      });
    }
  }
  return leaves;
}
module.exports = {
  topologicalSort,
  canBeScheduled,
  schedulingOrderToFinishTasks,
  allPossibleScheduling,
  characterOrderGivenSortedWords,
  canReconstructOriginalSequenceFromSequences,
  allRootsForMinimumHeightTrees,
};
