/*jslint
 node
*/
/*global describe, it */

const {assert} = require("chai");
const {
    allPossibleScheduling,
    allRootsForMinimumHeightTrees,
    canBeScheduled,
    canReconstructOriginalSequenceFromSequences,
    characterOrderGivenSortedWords,
    schedulingOrderToFinishTasks,
    topologicalSort
} = require("../src/coding_interviews_algorithms/graph_problems");
describe("graph problems", function () {
    it("should sort a graph topologically", function () {
        var edges = [
            [9, 2],
            [9, 0],
            [2, 0],
            [2, 1]
        ];
        assert.deepEqual(topologicalSort(edges), [9, 2, 0, 1]);
        edges = [
            [4, 2],
            [4, 3],
            [2, 0],
            [2, 1],
            [3, 1]
        ];
        assert.deepEqual(topologicalSort(edges), [4, 2, 3, 0, 1]);
        edges = [
            [6, 4],
            [6, 2],
            [5, 3],
            [5, 4],
            [3, 0],
            [3, 1],
            [3, 2],
            [4, 1]
        ];
        assert.deepEqual(topologicalSort(edges), [5, 6, 3, 4, 0, 2, 1]);
    });
    it(
        "should check a list of tasks with their dependencies can be scheduled",
        function () {
            var prerequisites = [
                [0, 1],
                [1, 2]
            ];
            assert.isTrue(canBeScheduled(prerequisites));
            prerequisites = [
                [0, 1],
                [1, 2],
                [2, 0]
            ];
            assert.isFalse(canBeScheduled(prerequisites));
            prerequisites = [
                [2, 5],
                [0, 5],
                [0, 4],
                [1, 4],
                [3, 2],
                [1, 3]
            ];
            assert.isTrue(canBeScheduled(prerequisites));
        }
    );
    it("should return the tasks ordering to finish all tasks", function () {
        var prerequisites = [
            [0, 1],
            [1, 2]
        ];
        assert.deepEqual(
            schedulingOrderToFinishTasks(prerequisites),
            [0, 1, 2]
        );
        prerequisites = [
            [0, 1],
            [1, 2],
            [2, 0]
        ];
        assert.deepEqual(schedulingOrderToFinishTasks(prerequisites), []);
        prerequisites = [
            [2, 5],
            [0, 5],
            [0, 4],
            [1, 4],
            [3, 2],
            [1, 3]
        ];
        assert.deepEqual(
            schedulingOrderToFinishTasks(prerequisites),
            [0, 1, 4, 3, 2, 5]
        );
    });
    it(
        "should return all possible scheduling order" +
        " given a list of tasks with prerequisites",
        function () {
            var prerequisites = [
                [0, 1],
                [1, 2]
            ];
            assert.deepEqual(allPossibleScheduling(prerequisites), [[0, 1, 2]]);
            prerequisites = [
                [3, 2],
                [3, 0],
                [2, 0],
                [2, 1]
            ];
            assert.deepEqual(allPossibleScheduling(prerequisites), [
                [3, 2, 0, 1],
                [3, 2, 1, 0]
            ]);
            prerequisites = [
                [2, 5],
                [0, 5],
                [0, 4],
                [1, 4],
                [3, 2],
                [1, 3]
            ];
            assert.deepEqual(allPossibleScheduling(prerequisites), [
                [0, 1, 4, 3, 2, 5],
                [0, 1, 3, 4, 2, 5],
                [0, 1, 3, 2, 4, 5],
                [0, 1, 3, 2, 5, 4],
                [1, 0, 3, 4, 2, 5],
                [1, 0, 3, 2, 4, 5],
                [1, 0, 3, 2, 5, 4],
                [1, 0, 4, 3, 2, 5],
                [1, 3, 0, 2, 4, 5],
                [1, 3, 0, 2, 5, 4],
                [1, 3, 0, 4, 2, 5],
                [1, 3, 2, 0, 5, 4],
                [1, 3, 2, 0, 4, 5]
            ]);
        }
    );
    it(
        "should return the character ordering of" +
        " a dictionary given the words ordering",
        function () {
            var sortedWords = ["ba", "bc", "ac", "cab"];
            assert.deepEqual(characterOrderGivenSortedWords(sortedWords), [
                "b",
                "a",
                "c"
            ]);
            sortedWords = ["cab", "aaa", "aab"];
            assert.deepEqual(characterOrderGivenSortedWords(sortedWords), [
                "c",
                "a",
                "b"
            ]);
            sortedWords = ["ywx", "wz", "xww", "xz", "zyy", "zwz"];
            assert.deepEqual(characterOrderGivenSortedWords(sortedWords), [
                "y",
                "w",
                "x",
                "z"
            ]);
        }
    );
    it(
        "should check reconstruct a sequence with an array of sequences",
        function () {
            var originalSequence = [1, 2, 3, 4];
            var sequences = [
                [1, 2],
                [2, 3],
                [3, 4]
            ];
            assert.isTrue(
                canReconstructOriginalSequenceFromSequences(
                    originalSequence,
                    sequences
                )
            );
            originalSequence = [1, 2, 3, 4];
            sequences = [
                [1, 2],
                [2, 3],
                [2, 4]
            ];
            assert.isFalse(
                canReconstructOriginalSequenceFromSequences(
                    originalSequence,
                    sequences
                )
            );
            originalSequence = [3, 1, 4, 2, 5];
            sequences = [
                [3, 1, 5],
                [1, 4, 2, 5]
            ];
            assert.isTrue(
                canReconstructOriginalSequenceFromSequences(
                    originalSequence,
                    sequences
                )
            );
        }
    );
    it("should return all roots to have the minimum height trees", function () {
        var edges = [
            [0, 1],
            [1, 2],
            [1, 3],
            [2, 4]
        ];
        assert.deepEqual(allRootsForMinimumHeightTrees(edges), [1, 2]);
        edges = [
            [0, 1],
            [0, 2],
            [2, 3]
        ];
        assert.deepEqual(allRootsForMinimumHeightTrees(edges), [0, 2]);
        edges = [
            [0, 1],
            [1, 2],
            [1, 3]
        ];
        assert.deepEqual(allRootsForMinimumHeightTrees(edges), [1]);
    });
});
