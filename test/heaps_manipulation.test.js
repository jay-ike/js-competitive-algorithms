const { assert } = require("chai");
const {
  buildNumberStream,
  allMediansOfSubArrayOfSize,
  findMaximumProfit,
} = require("../src/coding_interviews_algorithms/heap_manipulation");
describe("heap manipulations", function () {
  it("should return the median of a number stream", function () {
    let stream = buildNumberStream();
    stream.add(1);
    stream.add(3);
    assert.equal(stream.findMedian(), 2);
    stream.add(5);
    assert.equal(stream.findMedian(), 3);
    stream.add(4);
    assert.equal(stream.findMedian(), 3.5);
  });
  it("should return all the medians of subarray of a given size", function () {
    var array1 = [1, 2, -1, 3, 5];
    assert.deepEqual(allMediansOfSubArrayOfSize(array1, 2), [1.5, 0.5, 1, 4]);
    assert.deepEqual(allMediansOfSubArrayOfSize(array1, 3), [1, 2, 3]);
  });
  it("should return the maximum profit", function () {
    var projects = [0, 1, 2],
      profits = [1, 2, 3],
      initialCapital = 1,
      numberOfProjects = 2;
    assert.equal(
      findMaximumProfit(projects, profits, initialCapital, numberOfProjects),
      6
    );
    projects = [0, 1, 2, 3];
    profits = [1, 2, 3, 5];
    initialCapital = 0;
    numberOfProjects = 3;
    assert.equal(
      findMaximumProfit(projects, profits, initialCapital, numberOfProjects),
      8
    );
  });
});