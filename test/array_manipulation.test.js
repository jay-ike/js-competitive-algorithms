/*jslint
 node
 */
/*global describe, beforeEach, before, it */

const {
    kthSmallestElementInSortedMatrix
} = require("../src/coding_interviews_algorithms/array_manipulation");
const {assert} = require("chai");

describe("find the max sum in an array", function () {
    var input = [0, 1, 2, 3, 4, -5, 6];
    it("should return the max sum of subarray of size 5", function () {
        assert(input.maxSubArraySum(5), 10);
    });
    it("should return the max sum of subarray of size 3", function () {
        assert(input.maxSubArraySum(3), 9);
    });

    it("should throw an error if the size is out of range", function () {
        assert.throws(
            () => input.maxSubArraySum(10),
            RangeError,
            "cannot have a subarray of size 10"
        );
    });
    it("should throw an error if the size is negative", function () {
        assert.throws(
            () => input.maxSubArraySum(-1),
            RangeError,
            "cannot have a subarray of size -1"
        );
    });
});
describe("find the maximum number of elements in each basket", function () {
    it(
        "should return the maximum number of elements in the array",
        function () {
            var array = ["A", "B", "C", "A", "C"];
            var longList = ["A", "B", "C", "B", "B", "C"];
            assert.equal(array.maxElementsInBaskets(), 3);
            assert.equal(longList.maxElementsInBaskets(), 5);
        }
    );
});

describe("longest subarray with ones after replacement", function () {
    var arrays = [
        [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
        [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1]
    ];
    it(
        "should return the length of that subarray",
        function () {
            assert.equal(arrays[0].longestSubArrayAfterReplacement(2), 6);
            assert.equal(arrays[1].longestSubArrayAfterReplacement(3), 9);
        }
    );
});

describe("remove duplicates", function () {
    it("should return the length of the array", function () {
        var input = [];
        assert.equal(input.noDuplicateLength(), 0);
        input = [2, 3, 3, 3, 6, 9, 9];
        assert.equal(input.noDuplicateLength(), 4);
        input = [2, 2, 2, 2, 11];
        assert.equal(input.noDuplicateLength(), 2);
    });
});

describe("pair with target sum", function () {
    it("return the indices of that pair", function () {
        var input = [1, 2, 3, 4, 6];
        assert.deepEqual(input.indicesWithSum(6), [1, 3]);
        input = [2, 5, 9, 11];
        assert.deepEqual(input.indicesWithSum(11), [0, 2]);
    });
});
describe("squaring a sorted array", function () {
    it(
        "should return a sorted array containing the square of each elements",
        function () {
            var input = [-2, 1, 0, 2, 3];
            assert.deepEqual(input.sortedSquares(), [0, 1, 4, 4, 9]);
            input = [-3, -1, 0, 1, 2];
            assert.deepEqual(input.sortedSquares(), [0, 1, 1, 4, 9]);
        }
    );
});

describe("triplet sum to zero", function () {
    it(
        "should return unique triplets with sum equal to zero",
        function () {
            var input = [-3, 0, 1, 2, -1, 1, -2];
            assert.deepEqual(input.tripletsWhichSumIsZero(), [
                [-3, 1, 2],
                [-2, 0, 2],
                [-2, 1, 1],
                [-1, 0, 1]
            ]);
            input = [-5, 2, -1, -2, 3];
            assert.deepEqual(input.tripletsWhichSumIsZero(), [
                [-5, 2, 3],
                [-2, -1, 3]
            ]);
        }
    );
});

describe("triplet sum close to target", function () {
    it(
        "should return the smallest triplet sum close to a target",
        function () {
            var input = [-2, 0, 1, 2];
            assert.equal(input.smallestTripletSumCloseTo(2), 1);
            input = [-3, 1, -1, 2];
            assert.equal(input.smallestTripletSumCloseTo(1), 0);
        }
    );
});
describe("triplet sum smaller than target", function () {
    it("should return the  triplets sum than a target", function () {
        var input = [-1, 0, 2, 3];
        assert.deepEqual(input.tripletsSumSmallerThan(3), [
            [-1, 0, 3],
            [-1, 0, 2]
        ]);
        input = [-1, 4, 2, 1, 3];
        assert.deepEqual(input.tripletsSumSmallerThan(5), [
            [-1, 1, 4],
            [-1, 1, 3],
            [-1, 1, 2],
            [-1, 2, 3]
        ]);
    });
});
describe("subarray with product less than target", function () {
    it(
        "should return all subarray with product less than a target",
        function () {
            var input = [2, 5, 3, 10];
            assert.deepEqual(input.subArraysProductLessThan(30), [
                [2],
                [2, 5],
                [5],
                [5, 3],
                [3],
                [10]
            ]);
            input = [8, 2, 6, 5];
            assert.deepEqual(input.subArraysProductLessThan(50), [
                [8],
                [8, 2],
                [2],
                [2, 6],
                [6],
                [6, 5],
                [5]
            ]);
        }
    );
});
describe("dutch national flag problem ", function () {
    it("should sort in-place an array of 0s,1s and 2s", function () {
        var input = [1, 0, 2, 1, 0];
        assert.deepEqual(input.sortInPlace(), [0, 0, 1, 1, 2]);
        input = [2, 2, 0, 1, 2, 0];
        assert.deepEqual(input.sortInPlace(), [0, 0, 1, 2, 2, 2]);
    });
});
describe("quadruple sum to target", function () {
    it(
        "should return all quadruplets with sum equal to target",
        function () {
            var input = [4, 1, 2, -1, 1, -3];
            assert.deepEqual(input.quadrupletsWithSum(1), [
                [-3, -1, 1, 4],
                [-3, 1, 1, 2]
            ]);
            input = [2, 0, -1, 1, -2, 2];
            assert.deepEqual(input.quadrupletsWithSum(2), [
                [-2, 0, 2, 2],
                [-1, 0, 1, 2]
            ]);
        }
    );
});
describe("minimum window sort", function () {
    it("should find the minimum array to be sorted", function () {
        var input = [1, 2, 5, 3, 7, 10, 9, 12];
        assert.deepEqual(
            input.minimumArrayToBeSorted(),
            [5, 3, 7, 10, 9]
        );
        input = [1, 3, 2, 0, -1, 7, 10];
        assert.deepEqual(
            input.minimumArrayToBeSorted(),
            [1, 3, 2, 0, -1]
        );
        input = [1, 2, 3];
        assert.deepEqual(input.minimumArrayToBeSorted(), []);
        input = [3, 2, 1];
        assert.deepEqual(input.minimumArrayToBeSorted(), [3, 2, 1]);
    });
});
describe("cycle in circular array", function () {
    it("should check if array has cycle", function () {
        var input = [1, 2 - 1, 2, 2];
        assert.isTrue(input.hasCycle());
        input = [2, 2, -1, 2];
        assert.isTrue(input.hasCycle());
        input = [2, 1, -1, -2];
        assert.isFalse(input.hasCycle());
    });
});

describe("intervals problems", function () {
    it("should merge overlapping intervals", function () {
        var range1 = [
            [1, 4],
            [2, 5],
            [7, 9]
        ];
        var range2 = [
            [6, 7],
            [2, 4],
            [5, 9]
        ];
        var range3 = [
            [1, 4],
            [2, 6],
            [3, 5]
        ];
        assert.deepEqual(range1.mergeOverlappingIntervals(), [
            [1, 5],
            [7, 9]
        ]);
        assert.deepEqual(range2.mergeOverlappingIntervals(), [
            [2, 4],
            [5, 9]
        ]);
        assert.deepEqual(range3.mergeOverlappingIntervals(), [[1, 6]]);
    });
    it("should merge overlapping interval after insertion", function () {
        var range1 = [
            [1, 3],
            [5, 7],
            [8, 12]
        ];
        var range3 = [
            [2, 3],
            [5, 7]
        ];
        assert.deepEqual(range1.mergeOverlappingIntervalsAfterInsert([4, 6]), [
            [1, 3],
            [4, 7],
            [8, 12]
        ]);
        assert.deepEqual(range1.mergeOverlappingIntervalsAfterInsert([4, 9]), [
            [1, 3],
            [4, 12]
        ]);
        assert.deepEqual(range3.mergeOverlappingIntervalsAfterInsert([1, 4]), [
            [1, 4],
            [5, 7]
        ]);
    });
    it(
        "should return the intersection of two range of sorted intervals",
        function () {
            var range1 = [
                [1, 3],
                [5, 6],
                [9, 12]
            ];
            assert.deepEqual(
                range1.intersectionWithInterval([
                    [2, 3],
                    [5, 9]
                ]),
                [
                    [2, 3],
                    [5, 6],
                    [9, 9]
                ]
            );
            assert.deepEqual(range1.intersectionWithInterval([[5, 10]]), [
                [5, 6],
                [9, 10]
            ]);
        }
    );
    it("should check if overlapping intervals exists", function () {
        var range1 = [
            [1, 4],
            [2, 5],
            [7, 9]
        ];
        var range2 = [
            [6, 7],
            [2, 4],
            [8, 12]
        ];
        var range3 = [
            [4, 5],
            [2, 3],
            [3, 6]
        ];
        assert.isTrue(range1.hasOverlappingIntervals());
        assert.isTrue(range3.hasOverlappingIntervals());
        assert.isFalse(range2.hasOverlappingIntervals());
    });
    it("should return the minimum rooms to hold all intervals", function () {
        var ranges = [
            [
                [1, 4],
                [2, 5],
                [7, 9]
            ],
            [
                [6, 7],
                [2, 4],
                [8, 12]
            ],
            [
                [1, 4],
                [2, 3],
                [3, 6]
            ],
            [
                [4, 5],
                [2, 3],
                [2, 4],
                [3, 5]
            ]
        ];
        assert.equal(ranges[0].minimumRoomHoldingIntervals(), 2);
        assert.equal(ranges[1].minimumRoomHoldingIntervals(), 1);
        assert.equal(ranges[2].minimumRoomHoldingIntervals(), 2);
        assert.equal(ranges[3].minimumRoomHoldingIntervals(), 2);
    });
    it("should compute the maximum cpu load", function () {
        var ranges = [
            [
                [1, 4, 3],
                [2, 5, 4],
                [7, 9, 6]
            ],
            [
                [6, 7, 10],
                [2, 4, 11],
                [8, 12, 15]
            ],
            [
                [1, 4, 2],
                [2, 4, 1],
                [3, 6, 5]
            ]
        ];
        assert.equal(ranges[0].maximumCpuLoad(), 7);
        assert.equal(ranges[1].maximumCpuLoad(), 15);
        assert.equal(ranges[2].maximumCpuLoad(), 8);
    });
    it("should return the employees free times", function () {
        var schedules = [
            [
                [
                    [1, 3],
                    [5, 6]
                ],
                [
                    [2, 3],
                    [6, 8]
                ]
            ],
            [
                [
                    [1, 3],
                    [9, 12]
                ],
                [[2, 4]],
                [[6, 8]]
            ],
            [
                [[1, 3]],
                [[2, 4]],
                [
                    [3, 5],
                    [7, 9]
                ]
            ]
        ];
        assert.deepEqual(schedules[0].freeIntervals(), [[3, 5]]);
        assert.deepEqual(schedules[1].freeIntervals(), [
            [4, 6],
            [8, 9]
        ]);
        assert.deepEqual(schedules[2].freeIntervals(), [[5, 7]]);
    });
    it(
        "should return the next interval index" +
        " for each interval in an array of interval",
        function () {
            var intervals1 = [
                [2, 3],
                [3, 4],
                [5, 6]
            ];
            var intervals2 = [
                [3, 4],
                [1, 5],
                [4, 6]
            ];
            assert.deepEqual(intervals1.nextIntervalIndices(), [1, 2, -1]);
            assert.deepEqual(intervals2.nextIntervalIndices(), [2, -1, -1]);
            intervals2.push([3, 4]);
            assert.deepEqual(intervals2.nextIntervalIndices(), [2, -1, -1, 2]);
        }
    );
});

describe("cyclic sort problems", function () {
    var duplicatedArrays = [
        [2, 3, 1, 8, 2, 3, 5, 1],
        [4, 4, 1, 2],
        [2, 3, 2, 1],
        [2, 3, 3, 1, 3, 4, 5]
    ];
    var arrayWithNegative = [
        [-3, 1, 5, 4, 2],
        [3, -2, 0, 1, 2],
        [3, -1, 4, 5, 5],
        [2, 3, 4],
        [-2, -3, 4]
    ];
    it("should sort in-place an array of numbers", function () {
        var arrays = [
            [3, 1, 5, 4, 2],
            [2, 6, 4, 3, 1, 5],
            [1, 5, 6, 4, 3, 2]
        ];
        var expected = [1, 2, 3, 4, 5];
        arrays[0].cyclicSort();
        assert.deepEqual(arrays[0], expected);
        arrays[1].cyclicSort();
        arrays[2].cyclicSort();
        expected.push(6);
        assert.deepEqual(arrays[1], expected);
        assert.deepEqual(arrays[2], expected);
    });
    it("should find the missing number", function () {
        var arrays = [
            [4, 0, 3, 1],
            [6, 3, 5, 2, 4, 6, 0, 1]
        ];
        assert.equal(arrays[0].missingNumber(), 2);
        assert.equal(arrays[1].missingNumber(), 7);
    });
    it("should find all missing numbers", function () {
        assert.deepEqual(duplicatedArrays[0].allMissingNumbers(), [4, 6, 7]);
        assert.deepEqual(duplicatedArrays[1].allMissingNumbers(), [3]);
        assert.deepEqual(duplicatedArrays[2].allMissingNumbers(), [4]);
    });
    it("should return duplicated number", function () {
        assert.equal(duplicatedArrays[1].duplicatedNumber(), 4);
        assert.equal(duplicatedArrays[2].duplicatedNumber(), 2);
        assert.equal(duplicatedArrays[3].duplicatedNumber(), 3);
    });
    it("should return the corrupt pair", function () {
        assert.deepEqual(duplicatedArrays[1].findCorruptPair(), [4, 3]);
        assert.deepEqual(duplicatedArrays[2].findCorruptPair(), [2, 4]);
    });
    it("should return the smallest missing positive number", function () {
        assert.deepEqual(
            arrayWithNegative[0].firstKPositiveMissingNumbers(1),
            [3]
        );
        assert.deepEqual(
            arrayWithNegative[1].firstKPositiveMissingNumbers(1),
            [4]
        );
        assert.deepEqual(
            arrayWithNegative[2].firstKPositiveMissingNumbers(3),
            [1, 2, 6]
        );
        assert.deepEqual(
            arrayWithNegative[3].firstKPositiveMissingNumbers(3),
            [1, 5, 6]
        );
        assert.deepEqual(
            duplicatedArrays[2].firstKPositiveMissingNumbers(1),
            [4]
        );
    });
});
describe("subsets problems", function () {
    var set1;
    var set2;
    beforeEach(function () {
        set1 = [1, 3];
        set2 = [1, 5, 3];
    });
    it("should return all subset of a given list", function () {
        assert.deepEqual(set1.allSubsets(), [[], [1], [3], [1, 3]]);
        assert.deepEqual(set2.allSubsets(), [
            [],
            [1],
            [3],
            [1, 3],
            [5],
            [1, 5],
            [3, 5],
            [1, 3, 5]
        ]);
        set1 = [1, 3, 3];
        assert.deepEqual(set1.allSubsets(), [
            [],
            [1],
            [3],
            [1, 3],
            [3, 3],
            [1, 3, 3]
        ]);
    });
    it("should return all permutations of a given set", function () {
        assert.deepEqual(set1.allPermutations(), [
            [3, 1],
            [1, 3]
        ]);
        assert.deepEqual(set2.allPermutations(), [
            [3, 5, 1],
            [5, 3, 1],
            [5, 1, 3],
            [3, 1, 5],
            [1, 3, 5],
            [1, 5, 3]
        ]);
    });
});
describe("modified binary search problems", function () {
    it(
        "should return return the index of the" +
        " ceiling of a giving number in a sorted array",
        function () {
            var input = [4, 6, 10];
            assert.equal(input.ceilingIndexOf(6), 1);
            input = [1, 3, 8, 10, 15];
            assert.equal(input.ceilingIndexOf(12), 4);
            input = [1, 3, 8, 10];
            assert.equal(input.ceilingIndexOf(12), -1);
            input = [4, 6, 10];
            assert.equal(input.ceilingIndexOf(-1), 0);
        }
    );
    it(
        "should return the smallest letter greater" +
        " than a given letter in a sorted array",
        function () {
            var input = ["a", "c", "f", "h"];
            assert.equal(input.smallestLetterGreaterThan("f"), "h");
            input = ["a", "c", "f", "h"];
            assert.equal(input.smallestLetterGreaterThan("b"), "c");
            input = ["a", "c", "f", "h"];
            assert.equal(input.smallestLetterGreaterThan("m"), "a");
            input = ["a", "c", "f", "h"];
            assert.equal(input.smallestLetterGreaterThan("h"), "a");
        }
    );
    it(
        "should return the of the first and the last" +
        " index of a given number in a sorted array",
        function () {
            var input = [4, 6, 6, 6, 9];
            assert.deepEqual(input.rangeOf(6), [1, 3]);
            input = [1, 3, 8, 10, 15];
            assert.deepEqual(input.rangeOf(10), [3, 3]);
            input = [1, 3, 8, 10, 15];
            assert.deepEqual(input.rangeOf(12), [-1, -1]);
        }
    );
    it(
        "should return the index of an element in array of infinite size",
        function () {
            var input = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
            assert.equal(
                input.searchIndexOf(16),
                6
            );
            input = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
            assert.equal(
                input.searchIndexOf(11),
                -1
            );
            input = [1, 3, 8, 10, 15];
            assert.equal(input.searchIndexOf(15), 4);
            input = [1, 3, 8, 10, 15];
            assert.equal(input.searchIndexOf(200), -1);
        }
    );
    it(
        "should return the element with the minimum" +
        " difference with a given key",
        function () {
            var array = [4, 6, 10];
            assert.equal(array.minimumDifferenceWith(7), 6);
            assert.equal(array.minimumDifferenceWith(4), 4);
            assert.equal(array.minimumDifferenceWith(2), 4);
            assert.equal(array.minimumDifferenceWith(17), 10);
            array = [1, 3, 8, 10, 15];
            assert.equal(array.minimumDifferenceWith(12), 10);
        }
    );
    it("should return the maximum value in a bitonic array", function () {
        var input = [1, 3, 8, 12, 4, 2];
        assert.equal(input.bitonicArrayMaximum(), 12);
        input = [3, 8, 3, 1];
        assert.equal(input.bitonicArrayMaximum(), 8);
        input = [1, 3, 8, 12];
        assert.equal(input.bitonicArrayMaximum(), 12);
        input = [10, 9, 8];
        assert.equal(input.bitonicArrayMaximum(), 10);
    });
    it("should return the index of an element in a bitonic array", function () {
        var input = [1, 3, 8, 4, 3];
        assert.equal(input.bitonicArrayIndexOf(4), 3);
        input = [3, 8, 3, 1];
        assert.equal(input.bitonicArrayIndexOf(8), 1);
        input = [1, 3, 8, 12];
        assert.equal(input.bitonicArrayIndexOf(12), 3);
        input = [10, 9, 8];
        assert.equal(input.bitonicArrayIndexOf(10), 0);
    });
    it("should return the index of an element in a rotated array", function () {
        var input = [10, 15, 1, 3, 8];
        assert.equal(input.rotatedArrayIndexOf(15), 1);
        input = [4, 5, 7, 9, 10, -1, 2];
        assert.equal(input.rotatedArrayIndexOf(10), 4);
    });
    it("should return the rotation count in a rotated array", function () {
        var input = [10, 15, 1, 3, 8];
        assert.equal(input.rotatedArrayRotationCount(), 2);
        input = [4, 5, 7, 9, 10, -1, 2];
        assert.equal(input.rotatedArrayRotationCount(), 5);
        input = [2, 4, 5, 7, 10, -1];
        assert.equal(input.rotatedArrayRotationCount(), 5);
        input = [1, 3, 8, 10, 15];
        assert.equal(input.rotatedArrayRotationCount(), 0);
    });
});
describe("XOR pattern problems", function () {
    it(
        "should return the non-duplicated number" +
        " in an array of duplicated numbers",
        function () {
            var input = [];
            assert.isNull(input.findSingleNumber());
            input = [1, 4, 2, 1, 3, 2, 3];
            assert.equal(input.findSingleNumber(), 4);
            input = [7, 9, 7];
            assert.equal(input.findSingleNumber(), 9);
        }
    );
    it(
        "should return the 2 non-duplicated numbers" +
        " in an array of duplicated numbers",
        function () {
            var input = [];
            assert.deepEqual(input.findTwoSingleNumbers(), []);
            input = [1, 4, 2, 1, 3, 5, 6, 2, 3, 5];
            assert.deepEqual(
                input.findTwoSingleNumbers(),
                [4, 6]
            );
            input = [1, 2, 3, 1];
            assert.deepEqual(input.findTwoSingleNumbers(), [2, 3]);
        }
    );
    it("should flip and invert a matrix of binary numbers", function () {
        var input = [
            [1, 0, 1],
            [1, 1, 1],
            [0, 1, 1]
        ];
        assert.deepEqual(
            input.flipInvert(),
            [
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 1]
            ]
        );
        input = [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 1],
            [1, 0, 1, 0]
        ];
        assert.deepEqual(
            input.flipInvert(),
            [
                [1, 1, 0, 0],
                [1, 0, 0, 1],
                [0, 1, 1, 1],
                [1, 0, 1, 0]
            ]
        );
    });
});
describe("top K elements problems", function () {
    it("should return the k greatest numbers", function () {
        var input = [3, 1, 5, 12, 2, 11];
        assert.deepEqual(input.kGreatestNumbers(3), [12, 11, 5]);
        input = [12, 1, 5, 12, -1, 11];
        assert.deepEqual(input.kGreatestNumbers(3), [12, 12, 11]);
    });
    it("should return the k smallest number", function () {
        var input = [1, 5, 12, 2, 11, 5];
        assert.equal(input.kSmallestNumber(3), 5);
        input = [1, 5, 12, 2, 11, 5];
        assert.equal(input.kSmallestNumber(4), 5);
        input = [5, 12, 11, -1, 12];
        assert.equal(input.kSmallestNumber(3), 11);
    });
    it("should return the k closest point to the origin", function () {
        var input = [
            [1, 2],
            [1, 3]
        ];
        assert.deepEqual(
            input.kClosestPointsToOrigin(1),
            [[1, 2]]
        );
        input = [
            [1, 3],
            [3, 4],
            [2, -1]
        ];
        assert.deepEqual(
            input.kClosestPointsToOrigin(2),
            [
                [2, -1],
                [1, 3]
            ]
        );
    });
    it(
        "should return the cost for joining all ropes given" +
        " rope's length assuming the cost is the same as their length",
        function () {
            var input = [1, 3, 11, 5];
            assert.equal(input.minimumRopesJoiningCost(), 33);
            input = [3, 4, 5, 6];
            assert.equal(input.minimumRopesJoiningCost(), 36);
            input = [1, 3, 11, 5, 2];
            assert.equal(input.minimumRopesJoiningCost(), 42);
        }
    );
    it("should return the k most frequent element in an array", function () {
        var input = [1, 3, 5, 11, 12, 11, 12];
        assert.deepEqual(
            input.kMostFrequentNumbers(2),
            [12, 11]
        );
        input = [5, 12, 11, 3, 11];
        assert.deepEqual(input.kMostFrequentNumbers(2), [11, 5]);
    });
    it(
        "should return the k closest numbers to a given number",
        function () {
            var input = [5, 6, 7, 8, 9];
            assert.deepEqual(input.kClosestNumbersTo(3, 7), [6, 7, 8]);
            input = [2, 4, 5, 6, 9];
            assert.deepEqual(input.kClosestNumbersTo(3, 6), [4, 5, 6]);
            input = [2, 4, 5, 6, 9];
            assert.deepEqual(input.kClosestNumbersTo(3, 10), [5, 6, 9]);
        }
    );
    it(
        "should return the maximum distinct numbers" +
        " after k withdrawal in an array",
        function () {
            var input = [7, 3, 5, 8, 5, 3, 3];
            assert.equal(
                input.maxDistinctNumbersAfterKWithdrawals(2),
                3
            );
            input = [3, 5, 12, 11, 12];
            assert.equal(input.maxDistinctNumbersAfterKWithdrawals(3), 2);
            input = [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5];
            assert.equal(
                input.maxDistinctNumbersAfterKWithdrawals(2),
                3
            );
        }
    );
    it(
        "should return the sum of element between" +
        " a range of smallest numbers in an array",
        function () {
            var input = [1, 3, 12, 5, 15, 11];
            assert.equal(
                input.sumOfElementsBetweenK1AndK2SmallestElements(3, 6),
                23
            );
            input = [3, 5, 8, 7];
            assert.equal(
                input.sumOfElementsBetweenK1AndK2SmallestElements(1, 4),
                12
            );
        }
    );
    it(
        "should schedule the tasks to return the minimum cpu intervals" +
        " to finish all the given tasks with a cooling time of k intervals",
        function () {
            var input = ["a", "a", "a", "b", "c", "c"];
            assert.equal(
                input.minimumCpuIntervalsWhenCoolingInKIntervals(
                    2
                ),
                7
            );
            input = ["a", "b", "a"];
            assert.equal(
                input.minimumCpuIntervalsWhenCoolingInKIntervals(3),
                5
            );
        }
    );
});
describe("k-way merge problems", function () {
    it(
        "should return the kth smallest element given M sorted Arrays",
        function () {
            var lists = [
                [2, 6, 8],
                [3, 6, 7],
                [1, 3, 4]
            ];
            assert.equal(lists.kSmallestValueOfSortedArrays(5), 4);
            lists = [
                [5, 8, 9],
                [1, 7]
            ];
            assert.equal(lists.kSmallestValueOfSortedArrays(3), 7);
            assert.equal(lists.kSmallestValueOfSortedArrays(6), null);
        }
    );
    it(
        "should return the kth smallest element in a sorted matrix",
        function () {
            var sortedMatrix = [
                [2, 6, 8],
                [3, 7, 10],
                [5, 8, 11]
            ];
            assert.equal(kthSmallestElementInSortedMatrix(sortedMatrix, 5), 7);
            sortedMatrix = [
                [1, 2],
                [4, 5]
            ];
            assert.equal(kthSmallestElementInSortedMatrix(sortedMatrix, 2), 2);
            sortedMatrix = [[-5]];
            assert.equal(kthSmallestElementInSortedMatrix(sortedMatrix, 1), -5);
            assert.equal(
                kthSmallestElementInSortedMatrix(sortedMatrix, 2),
                null
            );
            sortedMatrix = [
                [1, 5, 9],
                [10, 11, 13],
                [12, 13, 15]
            ];
            assert.equal(kthSmallestElementInSortedMatrix(sortedMatrix, 8), 13);
        }
    );
    it(
        "should find the smallest range that include" +
        " at least one number of k sorted arrays",
        function () {
            var sortedArrays = [
                [1, 5, 8],
                [4, 12],
                [7, 8, 10]
            ];
            assert.deepEqual(
                sortedArrays.findRangeContainingAtLeastOneNumberOfEachArrays(),
                [4, 7]
            );
            sortedArrays = [
                [1, 9],
                [4, 12],
                [7, 8, 10]
            ];
            assert.deepEqual(
                sortedArrays.findRangeContainingAtLeastOneNumberOfEachArrays(),
                [9, 12]
            );
        }
    );
    it(
        "should return the k pairs with largest sum" +
        " for two sorted arrays in decreasing order",
        function () {
            var decreasinglySortedArray = [9, 8, 2];
            assert.deepEqual(
                decreasinglySortedArray.kLargestSumPairsWith([6, 3, 1], 3),
                [
                    [9, 3],
                    [8, 6],
                    [9, 6]
                ]
            );
            decreasinglySortedArray = [5, 2, 1];
            assert.deepEqual(
                decreasinglySortedArray.kLargestSumPairsWith([2, -1], 3),
                [
                    [5, -1],
                    [2, 2],
                    [5, 2]
                ]
            );
        }
    );
    it("should return the kth smallest element given an array", function () {
        var array = [1, 2, 12, 5, 11, 5];
        assert.equal(array.smallestElement(3), 5);
        assert.equal(array.smallestElement(4), 5);
        array = [5, 12, 11, -1, 12];
        assert.equal(array.smallestElement(3), 11);
    });
});

describe("array rotation", function () {
    var input;
    var expected;
    before(function () {
        input = [1, 2, 3, 4, 5];
        expected = [3, 4, 5, 1, 2];
    });

    it("should rotate an array with a given pivot", function () {
        assert.deepEqual(input.rotate(2), expected);
    });
    it(
        "should rotate an array even with" +
        " a pivot bigger than the arrayLength",
        function () {
            assert.deepEqual(input.rotate(8), [4, 5, 1, 2, 3]);
        }
    );
    it(
        "should make a right rotation when the pivot is negative",
        function () {
            assert.deepEqual(input.rotate(-2), [4, 5, 1, 2, 3]);
        }
    );
});
