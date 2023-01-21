/*jslint
 node, this
*/
"use strict";
const {TreeNode, emptyCallback} = require("../utils");
function orderTraversal(queue, updateResult, isZigzag = false) {
    var isLeftToRight = (
        isZigzag
        ? true
        : null
    );
    var levelResult;
    var levelSize;
    var currentNode;
    var index;
    while (queue.length > 0) {
        levelResult = [];
        levelSize = queue.length;
        index = 0;
        while (index < levelSize) {
            currentNode = queue.shift();
            if (isLeftToRight === false) {
                levelResult.unshift(currentNode.value);
            } else {
                levelResult.push(currentNode.value);
            }
            if (!Object.isNull(currentNode.left)) {
                queue.push(currentNode.left);
            }
            if (!Object.isNull(currentNode.right)) {
                queue.push(currentNode.right);
            }
            index += 1;
        }
        if (!Object.isNull(isLeftToRight)) {
            isLeftToRight = !isLeftToRight;
        }
        updateResult(levelResult);
    }
}
function breadthFirstTraversal(
    queue,
    {
        afterChildrenTraversal,
        afterLooping,
        beforeChildrenTraversal,
        beforeLooping
    }
) {
    var levelSize;
    var currentNode;
    var i;
    while (queue.length > 0) {
        levelSize = queue.length;
        beforeLooping = beforeLooping ?? emptyCallback;
        beforeLooping(queue);
        i = 0;
        while (i < levelSize) {
            currentNode = queue.shift();
            beforeChildrenTraversal = (
                beforeChildrenTraversal
                ??
                emptyCallback
            );
            beforeChildrenTraversal(
                queue,
                currentNode,
                i,
                levelSize
            );
            if (!Object.isNull(currentNode.left)) {
                queue.push(currentNode.left);
            }
            if (!Object.isNull(currentNode.right)) {
                queue.push(currentNode.right);
            }
            afterChildrenTraversal = (
                afterChildrenTraversal
                ??
                emptyCallback
            );
            afterChildrenTraversal(queue, currentNode);
            i += 1;
        }
        afterLooping = afterLooping ?? emptyCallback;
        afterLooping();
    }
}
function levelOrderTraversal(tree) {
    var result = [];
    var queue = [];
    queue.push(tree);
    orderTraversal(queue, (val) => result.push(val));
    return result;
}
function reverseLevelOrderTraversal(tree) {
    var result = [];
    var queue = [];
    queue.push(tree);
    orderTraversal(queue, (val) => result.unshift(val));
    return result;
}
function zigzagLevelOrderTraversal(tree) {
    var result = [];
    var queue = [];
    queue.push(tree);
    orderTraversal(queue, (val) => result.push(val), true);
    return result;
}
function levelAverages(tree) {
    var result = [];
    var queue = [];

    function addAverageResult(value, result) {
        var sum = value.reduce((prev, init) => prev + init, 0);
        result.push(sum / value.length);
    }

    queue.push(tree);
    orderTraversal(queue, (val) => addAverageResult(val, result));
    return result;
}
function minDepth(tree) {
    var depth = 1;
    var result = null;
    var queue = [];
    queue.push(tree);
    breadthFirstTraversal(queue, {
        afterChildrenTraversal: function (queue, node) {
            if (
                Object.isNull(node.right) &&
                Object.isNull(node.left) &&
                !Object.isNull(queue) &&
                Object.isNull(result)
            ) {
                result = depth;
            }
        },
        afterLooping: function () {
            depth += 1;
        }
    });
    return result;
}
function levelSuccessorOf(tree, value) {
    var queue = [];
    var result = null;
    queue.push(tree);
    breadthFirstTraversal(queue, {
        afterChildrenTraversal: function (queue, node) {
            if (node.value === value && Object.isNull(result)) {
                result = queue[0]?.value ?? null;
            }
        }
    });
    return result;
}
function connectLevelOrderSiblings(tree) {
    var queue = [];
    queue.push(tree);
    breadthFirstTraversal(queue, {
        beforeChildrenTraversal: function (val, node, index, levelSize) {
            node.next = (
                index === levelSize - 1
                ? null
                : val[0]
            );
        }
    });
}
function connectAllLevelOrderSiblings(tree) {
    var queue = [];
    queue.push(tree);
    breadthFirstTraversal(queue, {
        afterChildrenTraversal: function (queue, node) {
            node.next = queue[0] ?? null;
        }
    });
}
function printTree(tree) {
    var current = tree;
    var result = "";
    while (!Object.isNull(current)) {
        result += ` ${current.value} ->`;
        current = current.next;
    }
    result = `${result} null`;
    return result.trim();
}
function rightView(tree) {
    var queue = [];
    var result = [];
    queue.push(tree);
    breadthFirstTraversal(queue, {
        beforeLooping: function (val) {
            result.push(val[val.length - 1].value);
        }
    });
    return result;
}
function hasRootToLeafPathWithSum(tree, sum) {
    if (Object.isNull(tree)) {
        return false;
    }
    if (Object.isNull(tree.left) && Object.isNull(tree.right)) {
        if (sum === tree.value) {
            return true;
        } else {
            return false;
        }
    }
    return (
        hasRootToLeafPathWithSum(tree.left, sum - tree.value) ||
        hasRootToLeafPathWithSum(tree.right, sum - tree.value)
    );
}
function searchPath(node, sum, path, onFound) {
    if (Object.isNull(node)) {
        return;
    }
    if (Object.isNull(node.left) && Object.isNull(node.right)) {
        if (sum === node.value) {
            onFound(`${path} ${node.value} -> null`);
        }
    }
    searchPath(
        node.left,
        sum - node.value,
        `${path} ${node.value} ->`,
        onFound
    );
    searchPath(
        node.right,
        sum - node.value,
        `${path} ${node.value} ->`,
        onFound
    );
}
function allRootToLeafPathsWithSum(tree, sum) {
    var result = [];
    searchPath(tree, sum, "", function (value) {
        result.push(value.trim());
    });
    return result;
}
function pathNumbersSum(tree, num) {
    var currentNumber;
    if (Object.isNull(tree)) {
        return 0;
    }
    currentNumber = 10 * (num ?? 0) + tree.value;
    if (Object.isNull(tree.left) && Object.isNull(tree.right)) {
        return currentNumber;
    }
    return (
        pathNumbersSum(tree.left, currentNumber) +
        pathNumbersSum(tree.right, currentNumber)
    );
}
function hasPathOfSequence(tree, sequence) {
    var currentValue;
    if (
        Object.isNull(tree) ||
        typeof sequence.slice !== "function" ||
        sequence.length < 1
    ) {
        return false;
    }
    currentValue = sequence[0];
    if (tree.value !== currentValue) {
        return false;
    }
    if (Object.isNull(tree.left) && Object.isNull(tree.right)) {
        return true;
    }
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
    var nodes = [];
    var pathSum = 0;
    var i;
    if (Object.isNull(tree)) {
        return;
    }
    currentPath.push(tree.value);
    i = currentPath.length - 1;
    while (i >= 0) {
        pathSum += currentPath[i];
        nodes.push(currentPath[i]);
        if (pathSum === sum) {
            onFound(nodes.reverse().join(" -> "));
        }
        i -= 1;
    }
    recursiveTreeWalk(tree.left, sum, onFound, currentPath);
    recursiveTreeWalk(tree.right, sum, onFound, currentPath);
    currentPath.pop();
}
function totalNodesOnDiameter(tree) {
    var diameter = Number.NEGATIVE_INFINITY;
    function getNodeHeight(node, updateDiameter) {
        var leftHeight;
        var rightHeight;
        if (Object.isNull(node)) {
            return 0;
        }
        leftHeight = getNodeHeight(node.left, updateDiameter);
        rightHeight = getNodeHeight(node.right, updateDiameter);
        updateDiameter(leftHeight + rightHeight + 1);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    getNodeHeight(tree, function (val) {
        diameter = Math.max(diameter, val);
    });
    return diameter;
}
function maximumSumPath(tree) {
    var maxSum = Number.NEGATIVE_INFINITY;
    var paths = [];
    function getNodePath(node, updateSumPath) {
        var result = [];
        var leftMaxSum;
        var rightMaxSum;
        var path;
        var newSum;
        if (Object.isNull(node)) {
            return [0, null];
        }
        leftMaxSum = getNodePath(node.left, updateSumPath);
        rightMaxSum = getNodePath(node.right, updateSumPath);
        path = [];
        if (leftMaxSum[0] >= rightMaxSum[0]) {
            path = [...(leftMaxSum[1] ?? []), node.value];
            result = [leftMaxSum[0] + node.value, path];
        } else {
            path = [...(rightMaxSum[1] ?? []), node.value];
            result = [rightMaxSum[0] + node.value, path];
        }
        newSum = leftMaxSum[0] + node.value + rightMaxSum[0];
        leftMaxSum[1] = leftMaxSum[1] ?? [];
        rightMaxSum[1] = rightMaxSum[1] ?? [];
        rightMaxSum[1].reverse();
        updateSumPath(newSum, [
            ...leftMaxSum[1],
            node.value,
            ...rightMaxSum[1]
        ]);
        return result;
    }
    getNodePath(tree, function (sum, maxPath) {
        if (sum > maxSum) {
            maxSum = sum;
            paths = maxPath;
        }
    });
    return paths;
}
function constructUniqueBST(start, end) {
    var result = [];
    var i;
    var j;
    var k;
    var node;
    var leftSubtree;
    var rightSubtree;
    if (start > end) {
        result.push(null);
        return result;
    }
    i = start;
    while (i <= end) {
        leftSubtree = constructUniqueBST(start, i - 1);
        rightSubtree = constructUniqueBST(i + 1, end);
        j = 0;
        while (j < leftSubtree.length) {
            k = 0;
            while (k < rightSubtree.length) {
                node = new TreeNode(i);
                node.left = leftSubtree[j];
                node.right = rightSubtree[k];
                result.push(node);
                k += 1;
            }
            j += 1;
        }
        i += 1;
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
    var count;
    var leftSubtreeCount;
    var rightSubtreeCount;
    var i;
    if (number <= 1) {
        return 1;
    }
    count = 0;
    i = 1;
    while (i <= number) {
        leftSubtreeCount = countOfAllUniqueBSTStoringNumbersFromOneTo(i - 1);
        rightSubtreeCount = countOfAllUniqueBSTStoringNumbersFromOneTo(
            number - i
        );
        count += leftSubtreeCount * rightSubtreeCount;
        i += 1;
    }
    return count;
}

function leftLeavesSum(root) {
    var leftValue = 0;
    var rightValue = 0;

    if (root == null) {
        return 0;
    }
    if (root.left != null) {
        leftValue = Number.isNaN(Number.parseInt(`${root.left.value}`, 10)) ? 0 : root.left.value;
        leftValue += leftLeavesSum(root.left);
    }
    if (root.right != null) {
        rightValue = leftLeavesSum(root.right);
    }
    return leftValue + rightValue;
}

TreeNode.prototype.leftLeavesSum = function () {
    return leftLeavesSum(this);
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
    countOfAllUniqueBSTStoringNumbersFromOneTo
};
