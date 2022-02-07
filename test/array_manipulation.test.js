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
