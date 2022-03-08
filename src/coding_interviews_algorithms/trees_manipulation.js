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
module.exports = { TreeNode };
