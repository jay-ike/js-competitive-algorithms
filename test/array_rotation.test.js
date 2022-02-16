var assert = require("chai").assert;
const {
  rotateArray,
} = require("../src/coding_interviews_algorithms/array_manipulation");
describe("array rotation", function () {
  var input, expected;
  before(function () {
    input = [1, 2, 3, 4, 5];
    expected = [3, 4, 5, 1, 2];
  });

  it("should rotate an array with a given pivot", function () {
    assert.deepEqual(input.rotate(2), expected);
  });
  it("should rotate an array even with a pivot bigger than the arrayLength", function () {
    assert.deepEqual(input.rotate(8), [4, 5, 1, 2, 3]);
  });
  it("should make a right rotation when the pivot is negative", function () {
    assert.deepEqual(input.rotate(-2), [4, 5, 1, 2, 3]);
  });
});
