var assert = require("chai").assert;
var mergeSortedList = require("../src/k_way_merge");

describe("testing the k-way merging algorithm", function () {
  it("should merge sorted arrays in order", function () {
    assert.deepEqual(
      mergeSortedList([
        [1, 2, 5, 6],
        [10, 12, 14],
        [8, 9],
      ]),
      [1, 2, 5, 6, 8, 9, 10, 12, 14]
    );
  });
});
