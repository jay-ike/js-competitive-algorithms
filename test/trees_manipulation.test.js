const {
  TreeNode,
} = require("../src/coding_interviews_algorithms/trees_manipulation");
const { assert } = require("chai");

describe("tree manipulations", function () {
  var tree;
  beforeEach(() => {
    tree = TreeNode.fromArray([1, 2, 3, 4, 5, 6, 7]);
  });
  it("should traverse a tree levels from top to bottom", function () {
    assert.deepEqual(tree.levelOrderTraversal(), [[1], [2, 3], [4, 5, 6, 7]]);
  });
  it("should traverse a tree levels from bottom to top", function () {
    assert.deepEqual(tree.reverseLevelOrderTraversal(), [
      [4, 5, 6, 7],
      [2, 3],
      [1],
    ]);
  });
  it("should traverse a tree levels in a zigzag manner", function () {
    assert.deepEqual(tree.zigzagLevelOrderTraversal(), [
      [1],
      [3, 2],
      [4, 5, 6, 7],
    ]);
    tree = TreeNode.fromArray([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    assert.deepEqual(tree.zigzagLevelOrderTraversal(), [
      [1],
      [3, 2],
      [4, 5, 6, 7],
      [15, 14, 13, 12, 11, 10, 9, 8],
    ]);
  });
  it("should return the average value of elements in each level", function () {
    assert.deepEqual(tree.levelAverages(), [1, 2.5, 5.5]);
    tree = TreeNode.fromArray([12, 7, 1, 9, 2, 10, 5]);
    assert.deepEqual(tree.levelAverages(), [12, 4, 6.5]);
  });
  it("should return the minimum depth of a tree", function () {
    assert.equal(tree.minDepth(), 3);
    tree = TreeNode.fromArray([1, 2, 3, 4, 5]);
    assert.equal(tree.minDepth(), 2);
    tree = new TreeNode(1);
    tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
    tree.left = new TreeNode(9);
    assert.equal(tree.minDepth(), 2);
  });
  it("should return the level order successor of a given node", function () {
    assert.equal(tree.levelSuccessorOf(1), 2);
    assert.equal(tree.levelSuccessorOf(3), 4);
    assert.equal(tree.levelSuccessorOf(7), null);
    assert.equal(tree.levelSuccessorOf(0), null);
  });
  it("should connect level order siblings", function () {
    tree.connectLevelOrderSiblings();
    assert.deepEqual(tree.printLevelsOrder(), [
      "1 -> null",
      "2 -> 3 -> null",
      "4 -> 5 -> 6 -> 7 -> null",
    ]);
    tree = new TreeNode(1);
    tree.left = new TreeNode(9);
    tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
    tree.connectLevelOrderSiblings();
    assert.deepEqual(tree.printLevelsOrder(), [
      "1 -> null",
      "9 -> 2 -> null",
      "3 -> 4 -> null",
      "5 -> 6 -> null",
    ]);
  });
  it("should connect all level order siblings", function () {
    tree.connectAllLevelOrderSiblings();
    assert.equal(tree.printTree(), "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> null");
    tree = new TreeNode(1);
    tree.left = new TreeNode(9);
    tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
    tree.connectAllLevelOrderSiblings();
    assert.equal(tree.printTree(), "1 -> 9 -> 2 -> 3 -> 4 -> 5 -> 6 -> null");
  });
  it("should return the value of nodes in the right view of a binary tree", function () {
    assert.deepEqual(tree.rightView(), [1, 3, 7]);
    tree = new TreeNode(1);
    tree.left = TreeNode.fromArray([2, 4, 5, 6, 7]);
    tree.right = TreeNode.fromArray([3, 8]);
    assert.deepEqual(tree.rightView(), [1, 3, 8, 7]);
  });
});
