require("../src/coding_interviews_algorithms/array_manipulation");
const { assert } = require("chai");

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
  it("should return the maximum number of elements in the array", function () {
    let array = ["A", "B", "C", "A", "C"],
      longList = ["A", "B", "C", "B", "B", "C"];
    assert.equal(array.maxElementsInBaskets(), 3);
    assert.equal(longList.maxElementsInBaskets(), 5);
  });
});

describe("longest subarray with ones after replacement", function () {
  let arrays = [
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1],
  ];
  it("should return the length of that subarray", function () {
    assert.equal(arrays[0].longestSubArrayAfterReplacement(2), 6);
    assert.equal(arrays[1].longestSubArrayAfterReplacement(3), 9);
  });
});

describe("remove duplicates", function () {
  it("should return the length of the array", function () {
    assert.equal([].noDuplicateLength(), 0);
    assert.equal([2, 3, 3, 3, 6, 9, 9].noDuplicateLength(), 4);
    assert.equal([2, 2, 2, 2, 11].noDuplicateLength(), 2);
  });
});

describe("pair with target sum", function () {
  it("return the indices of that pair", function () {
    assert.deepEqual([1, 2, 3, 4, 6].indicesWithSum(6), [1, 3]);
    assert.deepEqual([2, 5, 9, 11].indicesWithSum(11), [0, 2]);
  });
});
describe("squaring a sorted array", function () {
  it("should return a sorted array containing the square of each elements", function () {
    assert.deepEqual([-2, 1, 0, 2, 3].sortedSquares(), [0, 1, 4, 4, 9]);
    assert.deepEqual([-3, -1, 0, 1, 2].sortedSquares(), [0, 1, 1, 4, 9]);
  });
});

describe("triplet sum to zero", function () {
  it("should return unique triplets with sum equal to zero", function () {
    assert.deepEqual([-3, 0, 1, 2, -1, 1, -2].tripletsWhichSumIsZero(), [
      [-3, 1, 2],
      [-2, 0, 2],
      [-2, 1, 1],
      [-1, 0, 1],
    ]);
    assert.deepEqual([-5, 2, -1, -2, 3].tripletsWhichSumIsZero(), [
      [-5, 2, 3],
      [-2, -1, 3],
    ]);
  });
});

describe("triplet sum close to target", function () {
  it("should return the smallest triplet sum close to a target", function () {
    assert.equal([-2, 0, 1, 2].smallestTripletSumCloseTo(2), 1);
    assert.equal([-3, 1, -1, 2].smallestTripletSumCloseTo(1), 0);
  });
});
describe("triplet sum smaller than target", function () {
  it("should return the  triplets sum than a target", function () {
    assert.deepEqual([-1, 0, 2, 3].tripletsSumSmallerThan(3), [
      [-1, 0, 3],
      [-1, 0, 2],
    ]);
    assert.deepEqual([-1, 4, 2, 1, 3].tripletsSumSmallerThan(5), [
      [-1, 1, 4],
      [-1, 1, 3],
      [-1, 1, 2],
      [-1, 2, 3],
    ]);
  });
});
describe("subarray with product less than target", function () {
  it("should return all subarray with product less than a target", function () {
    assert.deepEqual([2, 5, 3, 10].subArraysProductLessThan(30), [
      [2],
      [2, 5],
      [5],
      [5, 3],
      [3],
      [10],
    ]);
    assert.deepEqual([8, 2, 6, 5].subArraysProductLessThan(50), [
      [8],
      [8, 2],
      [2],
      [2, 6],
      [6],
      [6, 5],
      [5],
    ]);
  });
});
describe("dutch national flag problem ", function () {
  it("should sort in-place an array of 0s,1s and 2s", function () {
    assert.deepEqual([1, 0, 2, 1, 0].sortInPlace(), [0, 0, 1, 1, 2]);
    assert.deepEqual([2, 2, 0, 1, 2, 0].sortInPlace(), [0, 0, 1, 2, 2, 2]);
  });
});
describe("quadruple sum to target", function () {
  it("should return all quadruplets with sum equal to target", function () {
    assert.deepEqual([4, 1, 2, -1, 1, -3].quadrupletsWithSum(1), [
      [-3, -1, 1, 4],
      [-3, 1, 1, 2],
    ]);
    assert.deepEqual([2, 0, -1, 1, -2, 2].quadrupletsWithSum(2), [
      [-2, 0, 2, 2],
      [-1, 0, 1, 2],
    ]);
  });
});
describe("minimum window sort", function () {
  it("should find the minimum array to be sorted", function () {
    assert.deepEqual(
      [1, 2, 5, 3, 7, 10, 9, 12].minimumArrayToBeSorted(),
      [5, 3, 7, 10, 9]
    );
    assert.deepEqual(
      [1, 3, 2, 0, -1, 7, 10].minimumArrayToBeSorted(),
      [1, 3, 2, 0, -1]
    );
    assert.deepEqual([1, 2, 3].minimumArrayToBeSorted(), []);
    assert.deepEqual([3, 2, 1].minimumArrayToBeSorted(), [3, 2, 1]);
  });
});
describe("cycle in circular array", function () {
  it("should check if array has cycle", function () {
    assert.isTrue([1, 2 - 1, 2, 2].hasCycle());
    assert.isTrue([2, 2, -1, 2].hasCycle());
    assert.isFalse([2, 1, -1, -2].hasCycle());
  });
});

describe("intervals problems", function () {
  it("should merge overlapping intervals", function () {
    var range1 = [
        [1, 4],
        [2, 5],
        [7, 9],
      ],
      range2 = [
        [6, 7],
        [2, 4],
        [5, 9],
      ],
      range3 = [
        [1, 4],
        [2, 6],
        [3, 5],
      ];
    assert.deepEqual(range1.mergeOverlappingIntervals(), [
      [1, 5],
      [7, 9],
    ]);
    assert.deepEqual(range2.mergeOverlappingIntervals(), [
      [2, 4],
      [5, 9],
    ]);
    assert.deepEqual(range3.mergeOverlappingIntervals(), [[1, 6]]);
  });
  it("should merge overlapping interval after insertion", function () {
    var range1 = [
        [1, 3],
        [5, 7],
        [8, 12],
      ],
      range3 = [
        [2, 3],
        [5, 7],
      ];
    assert.deepEqual(range1.mergeOverlappingIntervalsAfterInsert([4, 6]), [
      [1, 3],
      [4, 7],
      [8, 12],
    ]);
    assert.deepEqual(range1.mergeOverlappingIntervalsAfterInsert([4, 9]), [
      [1, 3],
      [4, 12],
    ]);
    assert.deepEqual(range3.mergeOverlappingIntervalsAfterInsert([1, 4]), [
      [1, 4],
      [5, 7],
    ]);
  });
  it("should return the intersection of two range of sorted intervals", function () {
    var range1 = [
      [1, 3],
      [5, 6],
      [9, 12],
    ];
    assert.deepEqual(
      range1.intersectionWithInterval([
        [2, 3],
        [5, 9],
      ]),
      [
        [2, 3],
        [5, 6],
        [9, 9],
      ]
    );
    assert.deepEqual(range1.intersectionWithInterval([[5, 10]]), [
      [5, 6],
      [9, 10],
    ]);
  });
  it("should check if overlapping intervals exists", function () {
    var range1 = [
        [1, 4],
        [2, 5],
        [7, 9],
      ],
      range2 = [
        [6, 7],
        [2, 4],
        [8, 12],
      ],
      range3 = [
        [4, 5],
        [2, 3],
        [3, 6],
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
        [7, 9],
      ],
      [
        [6, 7],
        [2, 4],
        [8, 12],
      ],
      [
        [1, 4],
        [2, 3],
        [3, 6],
      ],
      [
        [4, 5],
        [2, 3],
        [2, 4],
        [3, 5],
      ],
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
        [7, 9, 6],
      ],
      [
        [6, 7, 10],
        [2, 4, 11],
        [8, 12, 15],
      ],
      [
        [1, 4, 2],
        [2, 4, 1],
        [3, 6, 5],
      ],
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
          [5, 6],
        ],
        [
          [2, 3],
          [6, 8],
        ],
      ],
      [
        [
          [1, 3],
          [9, 12],
        ],
        [[2, 4]],
        [[6, 8]],
      ],
      [
        [[1, 3]],
        [[2, 4]],
        [
          [3, 5],
          [7, 9],
        ],
      ],
    ];
    assert.deepEqual(schedules[0].freeIntervals(), [[3, 5]]);
    assert.deepEqual(schedules[1].freeIntervals(), [
      [4, 6],
      [8, 9],
    ]);
    assert.deepEqual(schedules[2].freeIntervals(), [[5, 7]]);
  });
});
