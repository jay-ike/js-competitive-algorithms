const { TreeNode, emptyCallback } = require("../utils");
function orderTraversal(queue, updateResult, isZigzag = false) {
  var isLeftToRight = isZigzag ? true : null;
  while (queue.length > 0) {
    let levelResult = [],
      levelSize = queue.length;
    for (let index = 0; index < levelSize; index++) {
      let currentNode = queue.shift();
      if (isLeftToRight === false) {
        levelResult.unshift(currentNode.value);
      } else {
        levelResult.push(currentNode.value);
      }
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
    }
    if (isLeftToRight != null) {
      isLeftToRight = !isLeftToRight;
    }
    updateResult(levelResult);
  }
}
function breadthFirstTraversal(
  queue,
  {
    beforeLooping,
    beforeChildrenTraversal,
    afterChildrenTraversal,
    afterLooping,
  }
) {
  while (queue.length > 0) {
    let levelSize = queue.length;
    (beforeLooping ?? emptyCallback)(queue);
    for (let i = 0; i < levelSize; i++) {
      let currentNode = queue.shift();
      (beforeChildrenTraversal ?? emptyCallback)(
        queue,
        currentNode,
        i,
        levelSize
      );
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
      (afterChildrenTraversal ?? emptyCallback)(queue, currentNode);
    }
    (afterLooping ?? emptyCallback)();
  }
}
function levelOrderTraversal(tree) {
  var result = [],
    queue = [];
  queue.push(tree);
  orderTraversal(queue, (val) => result.push(val));
  return result;
}
function reverseLevelOrderTraversal(tree) {
  var result = [],
    queue = [];
  queue.push(tree);
  orderTraversal(queue, (val) => result.unshift(val));
  return result;
}
function zigzagLevelOrderTraversal(tree) {
  var result = [],
    queue = [];
  queue.push(tree);
  orderTraversal(queue, (val) => result.push(val), true);
  return result;
}
function levelAverages(tree) {
  function addAverageResult(value, result) {
    var sum = value.reduce((prev, init) => prev + init, 0);
    result.push(sum / value.length);
  }
  var result = [],
    queue = [];
  queue.push(tree);
  orderTraversal(queue, (val) => addAverageResult(val, result));
  return result;
}
function minDepth(tree) {
  var depth = 1,
    result = null,
    queue = [];
  queue.push(tree);
  breadthFirstTraversal(queue, {
    afterLooping: () => depth++,
    afterChildrenTraversal: (_, node) => {
      if (node.right == null && node.left == null && result == null)
        result = depth;
    },
  });
  return result;
}
function levelSuccessorOf(tree, value) {
  var queue = [],
    result = null;
  queue.push(tree);
  breadthFirstTraversal(queue, {
    afterChildrenTraversal: (queue, node) => {
      if (node.value === value && result == null)
        result = queue[0]?.value ?? null;
    },
  });
  return result;
}
function connectLevelOrderSiblings(tree) {
  var queue = [];
  queue.push(tree);
  breadthFirstTraversal(queue, {
    beforeChildrenTraversal: (val, node, index, levelSize) =>
      (node.next = index === levelSize - 1 ? null : val[0]),
  });
}
function connectAllLevelOrderSiblings(tree) {
  var queue = [];
  queue.push(tree);
  breadthFirstTraversal(queue, {
    afterChildrenTraversal: (queue, node) => (node.next = queue[0] ?? null),
  });
}
function printTree(tree) {
  let current = tree,
    result = "";
  while (current != null) {
    result += ` ${current.value} ->`;
    current = current.next;
  }
  return `${result} null`.trim();
}
function rightView(tree) {
  var queue = [],
    result = [];
  queue.push(tree);
  breadthFirstTraversal(queue, {
    beforeLooping: (val) => result.push(val[val.length - 1].value),
  });
  return result;
}
function hasRootToLeafPathWithSum(tree, sum) {
  if (tree == null) return false;
  if (tree.left == null && tree.right == null) {
    if (sum === tree.value) return true;
    else return false;
  }
  return (
    hasRootToLeafPathWithSum(tree.left, sum - tree.value) ||
    hasRootToLeafPathWithSum(tree.right, sum - tree.value)
  );
}
function searchPath(node, sum, path, onFound) {
  if (node == null) return;
  if (node.left == null && node.right == null) {
    if (sum === node.value) onFound(`${path} ${node.value} -> null`);
  }
  searchPath(node.left, sum - node.value, `${path} ${node.value} ->`, onFound);
  searchPath(node.right, sum - node.value, `${path} ${node.value} ->`, onFound);
}
function allRootToLeafPathsWithSum(tree, sum) {
  var result = [];
  searchPath(tree, sum, "", (value) => {
    result.push(value.trim());
  });
  return result;
}
function pathNumbersSum(tree, num) {
  if (tree == null) return 0;
  var currentNumber = 10 * (num ?? 0) + tree.value;
  if (tree.left == null && tree.right == null) return currentNumber;
  return (
    pathNumbersSum(tree.left, currentNumber) +
    pathNumbersSum(tree.right, currentNumber)
  );
}
function hasPathOfSequence(tree, sequence) {
  if (
    tree == null ||
    typeof sequence.slice !== "function" ||
    sequence.length < 1
  )
    return false;
  var currentValue = sequence[0];
  if (tree.value !== currentValue) return false;
  if (tree.left == null && tree.right == null) return true;
  return (
    hasPathOfSequence(tree.left, sequence.slice(1)) ||
    hasPathOfSequence(tree.right, sequence.slice(1))
  );
}
function allPathsWithNodeValueSumEqualsTo(tree, sum) {
  var paths = [];
  recursiveTreeWalk(tree, sum, (val) => paths.push(val), []);
  return paths;
}
function recursiveTreeWalk(tree, sum, onFound, currentPath) {
  if (tree == null) return;
  let nodes = [],
    pathSum = 0;
  currentPath.push(tree.value);
  for (let i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i];
    nodes.push(currentPath[i]);
    if (pathSum === sum) onFound(nodes.reverse().join(" -> "));
  }
  recursiveTreeWalk(tree.left, sum, onFound, currentPath);
  recursiveTreeWalk(tree.right, sum, onFound, currentPath);
  currentPath.pop();
}
function totalNodesOnDiameter(tree) {
  function getNodeHeight(node, updateDiameter) {
    if (node == null) return 0;
    let leftHeight = getNodeHeight(node.left, updateDiameter);
    let rightHeight = getNodeHeight(node.right, updateDiameter);
    updateDiameter(leftHeight + rightHeight + 1);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  var diameter = Number.NEGATIVE_INFINITY;
  getNodeHeight(tree, (val) => {
    diameter = Math.max(diameter, val);
  });
  return diameter;
}
function maximumSumPath(tree) {
  function getNodePath(node, updateSumPath) {
    var result = [];
    if (node == null) return [0, null];
    let leftMaxSum = getNodePath(node.left, updateSumPath);
    let rightMaxSum = getNodePath(node.right, updateSumPath);
    let path = [];
    if (leftMaxSum[0] >= rightMaxSum[0]) {
      path = [...(leftMaxSum[1] ?? []), node.value];
      result = [leftMaxSum[0] + node.value, path];
    } else {
      path = [...(rightMaxSum[1] ?? []), node.value];
      result = [rightMaxSum[0] + node.value, path];
    }
    let newSum = leftMaxSum[0] + node.value + rightMaxSum[0];
    updateSumPath(newSum, [
      ...(leftMaxSum[1] ?? []),
      node.value,
      ...(rightMaxSum[1] ?? []).reverse(),
    ]);
    return result;
  }
  var maxSum = Number.NEGATIVE_INFINITY,
    path = [];
  getNodePath(tree, (sum, maxPath) => {
    if (sum > maxSum) {
      maxSum = sum;
      path = maxPath;
    }
  });
  return path;
}
function constructUniqueBST(start, end) {
  var result = [];
  if (start > end) {
    result.push(null);
    return result;
  }
  for (var i = start; i <= end; i++) {
    let leftSubtree = constructUniqueBST(start, i - 1),
      rightSubtree = constructUniqueBST(i + 1, end);
    for (let j = 0; j < leftSubtree.length; j++) {
      for (let k = 0; k < rightSubtree.length; k++) {
        const node = new TreeNode(i);
        node.left = leftSubtree[j];
        node.right = rightSubtree[k];
        result.push(node);
      }
    }
  }
  return result;
}
function allPossibleBstStoringNumberFromOneTo(number) {
  if (number <= 0) {
    return 0;
  }
  return constructUniqueBST(1, number);
}
function countOfAllUniqueBSTStoringNumbersFromOneTo(number) {
  if (number <= 1) {
    return 1;
  }
  let count = 0;
  for (let i = 1; i <= number; i++) {
    let leftSubtreeCount = countOfAllUniqueBSTStoringNumbersFromOneTo(i - 1);
    let rightSubtreeCount = countOfAllUniqueBSTStoringNumbersFromOneTo(
      number - i
    );
    count += leftSubtreeCount * rightSubtreeCount;
  }
  return count;
}

TreeNode.prototype.levelOrderTraversal = function () {
  return levelOrderTraversal(this);
};
TreeNode.prototype.reverseLevelOrderTraversal = function () {
  return reverseLevelOrderTraversal(this);
};
TreeNode.prototype.zigzagLevelOrderTraversal = function () {
  return zigzagLevelOrderTraversal(this);
};
TreeNode.prototype.levelAverages = function () {
  return levelAverages(this);
};
TreeNode.prototype.minDepth = function () {
  return minDepth(this);
};
TreeNode.prototype.levelSuccessorOf = function (value) {
  return levelSuccessorOf(this, value);
};
TreeNode.prototype.connectLevelOrderSiblings = function () {
  connectLevelOrderSiblings(this);
};
TreeNode.prototype.connectAllLevelOrderSiblings = function () {
  connectAllLevelOrderSiblings(this);
};
TreeNode.prototype.printTree = function () {
  return printTree(this);
};
TreeNode.prototype.rightView = function () {
  return rightView(this);
};
TreeNode.prototype.hasRootToLeafPathWithSum = function (value) {
  return hasRootToLeafPathWithSum(this, value);
};
TreeNode.prototype.allRootToLeafPathsWithSum = function (value) {
  return allRootToLeafPathsWithSum(this, value);
};
TreeNode.prototype.pathNumbersSum = function () {
  return pathNumbersSum(this);
};
TreeNode.prototype.hasPathOfSequence = function (value) {
  return hasPathOfSequence(this, value);
};
TreeNode.prototype.allPathsWithNodeValueSumEqualsTo = function (value) {
  return allPathsWithNodeValueSumEqualsTo(this, value);
};
TreeNode.prototype.totalNodesOnDiameter = function () {
  return totalNodesOnDiameter(this);
};
TreeNode.prototype.maximumSumPath = function () {
  return maximumSumPath(this);
};
module.exports = {
  TreeNode,
  allPossibleBstStoringNumberFromOneTo,
  countOfAllUniqueBSTStoringNumbersFromOneTo,
};
