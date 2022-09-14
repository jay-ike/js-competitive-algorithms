/*jslint
 node
 */
/*global it, describe, beforeEach, before */

const {
    TreeNode,
    allPossibleBstStoringNumberFromOneTo,
    countOfAllUniqueBSTStoringNumbersFromOneTo
} = require("../src/coding_interviews_algorithms/trees_manipulation");
const {assert} = require("chai");

describe("tree manipulations", function () {
    var tree;
    beforeEach(function () {
        tree = TreeNode.fromArray([1, 2, 3, 4, 5, 6, 7]);
    });
    it("should traverse a tree levels from top to bottom", function () {
        assert.deepEqual(
            tree.levelOrderTraversal(),
            [[1], [2, 3], [4, 5, 6, 7]]
        );
    });
    it("should traverse a tree levels from bottom to top", function () {
        assert.deepEqual(tree.reverseLevelOrderTraversal(), [
            [4, 5, 6, 7],
            [2, 3],
            [1]
        ]);
    });
    it("should traverse a tree levels in a zigzag manner", function () {
        assert.deepEqual(tree.zigzagLevelOrderTraversal(), [
            [1],
            [3, 2],
            [4, 5, 6, 7]
        ]);
        tree = TreeNode.fromArray([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
        ]);
        assert.deepEqual(tree.zigzagLevelOrderTraversal(), [
            [1],
            [3, 2],
            [4, 5, 6, 7],
            [15, 14, 13, 12, 11, 10, 9, 8]
        ]);
    });
    it(
        "should return the average value of elements in each level",
        function () {
            assert.deepEqual(tree.levelAverages(), [1, 2.5, 5.5]);
            tree = TreeNode.fromArray([12, 7, 1, 9, 2, 10, 5]);
            assert.deepEqual(tree.levelAverages(), [12, 4, 6.5]);
        }
    );
    it("should return the minimum depth of a tree", function () {
        assert.equal(tree.minDepth(), 3);
        tree = TreeNode.fromArray([1, 2, 3, 4, 5]);
        assert.equal(tree.minDepth(), 2);
        tree = new TreeNode(1);
        tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
        tree.left = new TreeNode(9);
        assert.equal(tree.minDepth(), 2);
    });
    it(
        "should return the level order successor of a given node",
        function () {
            assert.equal(tree.levelSuccessorOf(1), 2);
            assert.equal(tree.levelSuccessorOf(3), 4);
            assert.equal(tree.levelSuccessorOf(7), null);
            assert.equal(tree.levelSuccessorOf(0), null);
        }
    );
    it("should connect level order siblings", function () {
        tree.connectLevelOrderSiblings();
        assert.deepEqual(tree.printLevelsOrder(), [
            "1 -> null",
            "2 -> 3 -> null",
            "4 -> 5 -> 6 -> 7 -> null"
        ]);
        tree = new TreeNode(1);
        tree.left = new TreeNode(9);
        tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
        tree.connectLevelOrderSiblings();
        assert.deepEqual(tree.printLevelsOrder(), [
            "1 -> null",
            "9 -> 2 -> null",
            "3 -> 4 -> null",
            "5 -> 6 -> null"
        ]);
    });
    it("should connect all level order siblings", function () {
        tree.connectAllLevelOrderSiblings();
        assert.equal(
            tree.printTree(),
            "1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> null"
        );
        tree = new TreeNode(1);
        tree.left = new TreeNode(9);
        tree.right = TreeNode.fromArray([2, 3, 4, 5, 6]);
        tree.connectAllLevelOrderSiblings();
        assert.equal(
            tree.printTree(),
            "1 -> 9 -> 2 -> 3 -> 4 -> 5 -> 6 -> null"
        );
    });
    it(
        "should return the value of nodes in the right view of a binary tree",
        function () {
            assert.deepEqual(tree.rightView(), [1, 3, 7]);
            tree = new TreeNode(1);
            tree.left = TreeNode.fromArray([2, 4, 5, 6, 7]);
            tree.right = TreeNode.fromArray([3, 8]);
            assert.deepEqual(tree.rightView(), [1, 3, 8, 7]);
        }
    );
    it(
        "should check for a root-to-leaf path with a given sum",
        function () {
            assert.isTrue(tree.hasRootToLeafPathWithSum(10));
            assert.isTrue(tree.hasRootToLeafPathWithSum(7));
            assert.isFalse(tree.hasRootToLeafPathWithSum(12));
        }
    );
    it(
        "should return all root-to-leaf paths with a given sum",
        function () {
            tree = TreeNode.fromArray([1, 7, 9, 4, 5, 2, 7]);
            assert.deepEqual(tree.allRootToLeafPathsWithSum(12), [
                "1 -> 7 -> 4 -> null",
                "1 -> 9 -> 2 -> null"
            ]);
            tree = new TreeNode(12);
            tree.left = TreeNode.fromArray([7, 4]);
            tree.right = TreeNode.fromArray([1, 10, 5]);
            assert.deepEqual(tree.allRootToLeafPathsWithSum(23), [
                "12 -> 7 -> 4 -> null",
                "12 -> 1 -> 10 -> null"
            ]);
        }
    );
    it(
        "should return the sum of path in a " +
        "binary tree which node value are digit",
        function () {
            assert.equal(tree.pathNumbersSum(), 522);
            tree = new TreeNode(1);
            tree.left = TreeNode.fromArray([0, 1]);
            tree.right = TreeNode.fromArray([1, 6, 5]);
            assert.equal(tree.pathNumbersSum(), 332);
        }
    );
    it(
        "should check if a given sequence is a " +
        "root-to-leaf path in a binary tree",
        function () {
            assert.isTrue(tree.hasPathOfSequence([1, 3, 7]));
            assert.isTrue(tree.hasPathOfSequence([1, 2, 4]));
            assert.isFalse(tree.hasPathOfSequence([5, 2, 4]));
            tree = TreeNode.fromArray([1, 2, 3, 4, undefined, 6, 7]);
            assert.isFalse(tree.hasPathOfSequence([1, 2]));
            assert.isFalse(tree.hasPathOfSequence({"0": 1}));
        }
    );
    it(
        "should give all path not necessary root-to-leaf " +
        "of in binary tree with the given sum",
        function () {
            assert.deepEqual(tree.allPathsWithNodeValueSumEqualsTo(10), [
                "1 -> 3 -> 6",
                "3 -> 7"
            ]);
        }
    );
    it(
        "returns the number of nodes of the " +
        "longest path between any leaf of a binary tree",
        function () {
            assert.equal(tree.totalNodesOnDiameter(), 5);
            tree = new TreeNode(1);
            tree.left = new TreeNode(2);
            tree.right = new TreeNode(3);
            tree.right.left = TreeNode.fromArray([5, 7, 8, 10]);
            tree.right.right = new TreeNode(6);
            tree.right.right.right = new TreeNode(9);
            tree.right.right.right.right = new TreeNode(11);
            assert.equal(tree.totalNodesOnDiameter(), 7);
        }
    );
    describe("binary tree maximum sum path", function () {
        var firstTree;
        var secondTree;
        before(function () {
            firstTree = new TreeNode(1);
            firstTree.left = TreeNode.fromArray([2, 4]);
            firstTree.right = TreeNode.fromArray([3, 5, 6]);
            secondTree = new TreeNode(1);
            secondTree.left = TreeNode.fromArray([2, 1, 3]);
            secondTree.right = TreeNode.fromArray([3, 5, 6, 7, 8, 9]);
        });
        it(
            "should return the maximum sum path of a binary tree",
            function () {
                assert.equal(
                    firstTree.maximumSumPath().reduce(
                        (prev, cur) => prev + cur,
                        0
                    ),
                    16
                );
                assert.equal(
                    secondTree.maximumSumPath().reduce(
                        (prev, cur) => prev + cur,
                        0
                    ),
                    31
                );
                assert.deepEqual(firstTree.maximumSumPath(), [4, 2, 1, 3, 6]);
                assert.deepEqual(secondTree.maximumSumPath(), [8, 5, 3, 6, 9]);
            }
        );
    });
    it(
        "should return the possible BST from " +
        "storing numbers from 1 to a given number",
        function () {
            var result = allPossibleBstStoringNumberFromOneTo(2);
            assert.deepEqual(
                result.map(function (element) {
                    return element.printLevelsOrder();
                }),
                [
                    TreeNode.fromArray([1, null, 2]).printLevelsOrder(),
                    TreeNode.fromArray([2, 1]).printLevelsOrder()
                ]
            );
            result = allPossibleBstStoringNumberFromOneTo(3);
            assert.deepEqual(result.map(function (element) {
                return element.printLevelsOrder();
            }), [
                TreeNode.fromArray([
                    1,
                    null,
                    2,
                    null,
                    null,
                    null,
                    3
                ]).printLevelsOrder(),
                TreeNode.fromArray([
                    1,
                    null,
                    3,
                    null,
                    null,
                    2
                ]).printLevelsOrder(),
                TreeNode.fromArray([2, 1, 3]).printLevelsOrder(),
                TreeNode.fromArray([3, 1, null, null, 2]).printLevelsOrder(),
                TreeNode.fromArray([3, 2, null, 1]).printLevelsOrder()
            ]);
        }
    );
    it(
        "should return the count of all possible BST storing number",
        function () {
            assert.equal(countOfAllUniqueBSTStoringNumbersFromOneTo(2), 2);
            assert.equal(countOfAllUniqueBSTStoringNumbersFromOneTo(3), 5);
            assert.equal(countOfAllUniqueBSTStoringNumbersFromOneTo(4), 14);
        }
    );
});
