const { assert } = require("chai");
const {
  maxProfitFittingCapacityHavingDistinctItems,
  maxProfitFittingCapacityWithAnyItems,
  allPossibleChangesOf,
  minDenominationsToChange,
  maximumRibbonCuts,
  fibonacciNumber,
  totalWaysOfClimbingStairs,
  totalWaysOfSummarizing,
  minJumpsToReachTheEnd,
  minFeeToClimbStairs,
  maxWealthSumInNonAdjacentHouses,
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

describe("stair case problems", function () {
  it("should return the number of ways to climb a stair of n steps with 1,2 or 3 steps allowed", function () {
    assert.equal(totalWaysOfClimbingStairs(3), 4); // {1,1,1} & {2,1} & {1,2} & {3}
    assert.equal(totalWaysOfClimbingStairs(4), 7);
  });
  it("should return the of ways to express a number as a sum of 1,3 or 4", function () {
    assert.equal(totalWaysOfSummarizing(4), 4); // {1,1,1,1} & {3,1} & {1,3} & {4}
    assert.equal(totalWaysOfSummarizing(5), 6);
  });
  it("should return the minimum jump to reach the end of an array", function () {
    let array = [2, 1, 1, 1, 4];
    assert.equal(minJumpsToReachTheEnd(array, 0), 3); // 0->2->3->4
    array = [1, 1, 3, 6, 9, 3, 0, 1, 3];
    assert.equal(minJumpsToReachTheEnd(array, 0), 4); // 0->1->2->3->8
  });
  it("compute the minimum fee to pay to reach the top of a stair of n steps with each step having a fee and 1,2 or 3 steps allowed", function () {
    var fees = [1, 2, 5, 2, 1, 2];
    assert.equal(minFeeToClimbStairs(6, fees), 3); // 0->3->6 (1+2)
    fees = [2, 3, 4, 5];
    assert.equal(minFeeToClimbStairs(4, fees), 5); // 0->1->5 (2+3)
  });
  it("compute the maximum money which can be stolen in non-adjacent houses given the house wealth", function () {
    var wealths = [2, 5, 1, 3, 6, 2, 4];
    assert.equal(maxWealthSumInNonAdjacentHouses(wealths), 15); // 5+6+4
    wealths = [2, 10, 14, 8, 1];
    assert.equal(maxWealthSumInNonAdjacentHouses(wealths), 18); // 5+6+4
  });
});

describe("string longest palindromic subsequence problem", function () {
  it("should return the length of the longest palindromic subsequence of a given string", function () {
    let string = "abdbca";
    assert.equal(string.longestPalindromicSubsequence(), 5);
    string = "cddpd";
    assert.equal(string.longestPalindromicSubsequence(), 3);
    string = "par";
    assert.equal(string.longestPalindromicSubsequence(), 1);
  });
  it("should return the length of the longest palindromic substring of a given string", function () {
    let string = "abdbca";
    assert.equal(string.longestPalindromicSubstring(), 3);
    string = "cddpd";
    assert.equal(string.longestPalindromicSubstring(), 3);
    string = "par";
    assert.equal(string.longestPalindromicSubstring(), 1);
  });
  it("should return the minimum deletion to make a string palindrome", function () {
    let string = "abdbca";
    assert.equal(string.minimumDeletionForPalindrome(), 1);
    string = "cddpd";
    assert.equal(string.minimumDeletionForPalindrome(), 2);
    string = "par";
    assert.equal(string.minimumDeletionForPalindrome(), 2);
  });
  it("should return the minimum palindromic cuts of a given string", function () {
    let string = "abdbca";
    assert.equal(string.minPalindromicCuts(), 3);
    string = "cddpd";
    assert.equal(string.minPalindromicCuts(), 2);
    string = "par";
    assert.equal(string.minPalindromicCuts(), 2);
    string = "pp";
    assert.equal(string.minPalindromicCuts(), 0);
  });
  it("should return the count of palindromic substring", function () {
    let string = "abdbca";
    assert.equal(string.palindromicSubstringCount(), 7);
    string = "cddpd";
    assert.equal(string.palindromicSubstringCount(), 7);
    string = "par";
    assert.equal(string.palindromicSubstringCount(), 3);
    string = "pp";
    assert.equal(string.palindromicSubstringCount(), 3);
  });
});
