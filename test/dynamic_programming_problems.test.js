const { assert } = require("chai");
const {
  maxProfitFittingCapacityHavingDistinctItems,
  maxProfitFittingCapacityWithAnyItems,
  allPossibleChangesOf,
  minDenominationsToChange,
  maximumRibbonCuts,
  fibonacciNumber,
} = require("../src/coding_interviews_algorithms/dynamic_programming_problems");
describe("knapsack problems", function () {
  it("should return the maximum profit for items fitting in a given capacity with distinct items", function () {
    var profits = [1, 6, 10, 16],
      weights = [1, 2, 3, 5];
    assert.equal(
      maxProfitFittingCapacityHavingDistinctItems(profits, weights, 7),
      22
    );
    assert.equal(
      maxProfitFittingCapacityHavingDistinctItems(profits, weights, 6),
      17
    );
  });
  it("should return the maximum profit for items fitting a given capacity with any items", function () {
    var profits = [15, 20, 50],
      weights = [1, 2, 3];
    assert.equal(maxProfitFittingCapacityWithAnyItems(profits, weights, 5), 80);
    assert.equal(
      maxProfitFittingCapacityWithAnyItems(profits, weights, 6),
      100
    );
  });
  it("should return all possible coin changes of an amount with given denominations", function () {
    var denominations = [1, 2, 3];
    assert.equal(allPossibleChangesOf(6, denominations), 7);
    assert.equal(allPossibleChangesOf(5, denominations), 5);
    assert.equal(allPossibleChangesOf(7, denominations), 8);
  });
  it("should return the minimum denominations to change an amount with a given denominations", function () {
    var denominations = [1, 2, 3];
    assert.equal(minDenominationsToChange(5, denominations), 2);
    assert.equal(minDenominationsToChange(7, denominations), 3);
    assert.equal(minDenominationsToChange(11, denominations), 4);
  });
  it("should return the maximum ribbon cut given a ribbon length an cut lengths", function () {
    var cutLengths = [2, 3, 5];
    assert.equal(maximumRibbonCuts(5, cutLengths), 2);
    cutLengths = [2, 3];
    assert.equal(maximumRibbonCuts(7, cutLengths), 3);
    cutLengths = [3, 5, 7];
    assert.equal(maximumRibbonCuts(13, cutLengths), 3);
  });
});
it("should return the ith fibonacci number", function () {
  assert.equal(fibonacciNumber(3), 2);
  assert.equal(fibonacciNumber(5), 5);
  assert.equal(fibonacciNumber(8), 21);
});
describe("subsets problems", function () {
  it("should check if a set of numbers can have two partitions of equal sum", function () {
    var array = [1, 2, 3, 4];
    assert.isTrue(array.hasTwoPartitionsOfEqualSum());
    array = [1, 1, 3, 4, 7];
    assert.isTrue(array.hasTwoPartitionsOfEqualSum());
    array = [2, 3, 4, 6];
    assert.isFalse(array.hasTwoPartitionsOfEqualSum());
    array = [1, 5, 7, 9];
    assert.isFalse(array.hasTwoPartitionsOfEqualSum());
  });
  it("should check if a subset exists with a given sum", function () {
    var array = [1, 2, 3, 7];
    assert.isTrue(array.hasSubsetWithSum(6));
    array = [1, 2, 7, 1, 5];
    assert.isTrue(array.hasSubsetWithSum(10));
    array = [1, 3, 4, 8];
    assert.isFalse(array.hasSubsetWithSum(6));
  });
  it("should return the minimum difference between two subsets of a given array of numbers", function () {
    var array = [1, 2, 3, 9];
    assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 3);
    array = [1, 2, 7, 1, 5];
    assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 0);
    array = [1, 3, 100, 4];
    assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 92);
  });
  it("should return the count of subset with a given sum", function () {
    var array = [1, 1, 2, 3];
    assert.equal(array.countOfSubsetWithSum(4), 3);
    array = [1, 2, 7, 1, 5];
    assert.equal(array.countOfSubsetWithSum(9), 3);
    array = [1, 2, 7, 1, 5];
    assert.equal(array.countOfSubsetWithSum(17), 0);
  });
  it("should return the number of ways we can add or remove numbers in a given set to have a target sum", function () {
    var array = [1, 1, 2, 3];
    assert.equal(array.numberOfSymbolsCombinationToHaveTheSum(1), 3); //+1-1-2+3 & -1+1-2+3 & +1+1+2-3
    array = [1, 2, 7, 1];
    assert.equal(array.numberOfSymbolsCombinationToHaveTheSum(9), 2); //+1+2+7-1 & -1+2+7+1
  });
});
