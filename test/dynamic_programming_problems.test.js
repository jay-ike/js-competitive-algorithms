/*jslint
 node
 */
/*global describe, it */

const {assert} = require("chai");
const {
    allPossibleChangesOf,
    fibonacciNumber,
    maxProfitFittingCapacityHavingDistinctItems,
    maxProfitFittingCapacityWithAnyItems,
    maxWealthSumInNonAdjacentHouses,
    maximumRibbonCuts,
    minDenominationsToChange,
    minFeeToClimbStairs,
    minJumpsToReachTheEnd,
    totalWaysOfClimbingStairs,
    totalWaysOfSummarizing
} = require("../src/coding_interviews_algorithms/dynamic_programming_problems");
describe("knapsack problems", function () {
    it(
        "should return the maximum profit for items" +
        " fitting in a given capacity with distinct items",
        function () {
            var profits = [1, 6, 10, 16];
            var weights = [1, 2, 3, 5];
            assert.equal(
                maxProfitFittingCapacityHavingDistinctItems(
                    profits,
                    weights,
                    7
                ),
                22
            );
            assert.equal(
                maxProfitFittingCapacityHavingDistinctItems(
                    profits,
                    weights,
                    6
                ),
                17
            );
        }
    );
    it(
        "should return the maximum profit for items" +
        " fitting a given capacity with any items",
        function () {
            var profits = [15, 20, 50];
            var weights = [1, 2, 3];
            assert.equal(maxProfitFittingCapacityWithAnyItems(
                profits,
                weights,
                5
            ), 80);
            assert.equal(
                maxProfitFittingCapacityWithAnyItems(profits, weights, 6),
                100
            );
        }
    );
    it(
        "should return all possible coin changes of" +
        " an amount with given denominations",
        function () {
            var denominations = [1, 2, 3];
            assert.equal(allPossibleChangesOf(6, denominations), 7);
            assert.equal(allPossibleChangesOf(5, denominations), 5);
            assert.equal(allPossibleChangesOf(7, denominations), 8);
        }
    );
    it(
        "should return the minimum denominations to change" +
        " an amount with a given denominations",
        function () {
            var denominations = [1, 2, 3];
            assert.equal(minDenominationsToChange(5, denominations), 2);
            assert.equal(minDenominationsToChange(7, denominations), 3);
            assert.equal(minDenominationsToChange(11, denominations), 4);
        }
    );
    it(
        "should return the maximum ribbon cut given" +
        " a ribbon length an cut lengths",
        function () {
            var cutLengths = [2, 3, 5];
            assert.equal(maximumRibbonCuts(5, cutLengths), 2);
            cutLengths = [2, 3];
            assert.equal(maximumRibbonCuts(7, cutLengths), 3);
            cutLengths = [3, 5, 7];
            assert.equal(maximumRibbonCuts(13, cutLengths), 3);
        }
    );
});
it("should return the ith fibonacci number", function () {
    assert.equal(fibonacciNumber(3), 2);
    assert.equal(fibonacciNumber(5), 5);
    assert.equal(fibonacciNumber(8), 21);
});
describe("subsets problems", function () {
    it(
        "should check if a set of numbers can have two partitions of equal sum",
        function () {
            var array = [1, 2, 3, 4];
            assert.isTrue(array.hasTwoPartitionsOfEqualSum());
            array = [1, 1, 3, 4, 7];
            assert.isTrue(array.hasTwoPartitionsOfEqualSum());
            array = [2, 3, 4, 6];
            assert.isFalse(array.hasTwoPartitionsOfEqualSum());
            array = [1, 5, 7, 9];
            assert.isFalse(array.hasTwoPartitionsOfEqualSum());
        }
    );
    it("should check if a subset exists with a given sum", function () {
        var array = [1, 2, 3, 7];
        assert.isTrue(array.hasSubsetWithSum(6));
        array = [1, 2, 7, 1, 5];
        assert.isTrue(array.hasSubsetWithSum(10));
        array = [1, 3, 4, 8];
        assert.isFalse(array.hasSubsetWithSum(6));
    });
    it(
        "should return the minimum difference between" +
        " two subsets of a given array of numbers",
        function () {
            var array = [1, 2, 3, 9];
            assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 3);
            array = [1, 2, 7, 1, 5];
            assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 0);
            array = [1, 3, 100, 4];
            assert.equal(array.minimumDifferenceBetweenTwoSubSetSum(), 92);
        }
    );
    it("should return the count of subset with a given sum", function () {
        var array = [1, 1, 2, 3];
        assert.equal(array.countOfSubsetWithSum(4), 3);
        array = [1, 2, 7, 1, 5];
        assert.equal(array.countOfSubsetWithSum(9), 3);
        array = [1, 2, 7, 1, 5];
        assert.equal(array.countOfSubsetWithSum(17), 0);
    });
    it(
        "should return the number of ways we can add or remove" +
        " numbers in a given set to have a target sum",
        function () {
            var array = [1, 1, 2, 3];
            assert.equal(
                array.numberOfSymbolsCombinationToHaveTheSum(1),
                3
            ); //+1-1-2+3 & -1+1-2+3 & +1+1+2-3
            array = [1, 2, 7, 1];
            assert.equal(
                array.numberOfSymbolsCombinationToHaveTheSum(9),
                2
            ); //+1+2+7-1 & -1+2+7+1
        }
    );
});

describe("stair case problems", function () {
    it(
        "should return the number of ways to climb a stair" +
        " of n steps with 1,2 or 3 steps allowed",
        function () {
            assert.equal(
                totalWaysOfClimbingStairs(3),
                4
            ); // {1,1,1} & {2,1} & {1,2} & {3}
            assert.equal(totalWaysOfClimbingStairs(4), 7);
        }
    );
    it(
        "should return the of ways to express a number as a sum of 1,3 or 4",
        function () {
            assert.equal(
                totalWaysOfSummarizing(4),
                4
            ); // {1,1,1,1} & {3,1} & {1,3} & {4}
            assert.equal(totalWaysOfSummarizing(5), 6);
        }
    );
    it(
        "should return the minimum jump to reach the end of an array",
        function () {
            var array = [2, 1, 1, 1, 4];
            assert.equal(minJumpsToReachTheEnd(array, 0), 3); // 0->2->3->4
            array = [1, 1, 3, 6, 9, 3, 0, 1, 3];
            assert.equal(minJumpsToReachTheEnd(array, 0), 4); // 0->1->2->3->8
        }
    );
    it(
        "compute the minimum fee to pay to reach the top of a stair" +
        " of n steps with each step having a fee and 1,2 or 3 steps allowed",
        function () {
            var fees = [1, 2, 5, 2, 1, 2];
            assert.equal(minFeeToClimbStairs(6, fees), 3); // 0->3->6 (1+2)
            fees = [2, 3, 4, 5];
            assert.equal(minFeeToClimbStairs(4, fees), 5); // 0->1->5 (2+3)
        }
    );
    it(
        "compute the maximum money which can be stolen in" +
        " non-adjacent houses given the house wealth",
        function () {
            var wealths = [2, 5, 1, 3, 6, 2, 4];
            assert.equal(maxWealthSumInNonAdjacentHouses(wealths), 15); // 5+6+4
            wealths = [2, 10, 14, 8, 1];
            assert.equal(maxWealthSumInNonAdjacentHouses(wealths), 18); // 5+6+4
        }
    );
});

describe("string longest palindromic subsequence problem", function () {
    it(
        "should return the length of the" +
        " longest palindromic subsequence of a given string",
        function () {
            var string = "abdbca";
            assert.equal(string.longestPalindromicSubsequence(), 5);
            string = "cddpd";
            assert.equal(string.longestPalindromicSubsequence(), 3);
            string = "par";
            assert.equal(string.longestPalindromicSubsequence(), 1);
        }
    );
    it(
        "should return the length of the" +
        " longest palindromic substring of a given string",
        function () {
            var string = "abdbca";
            assert.equal(string.longestPalindromicSubstring(), 3);
            string = "cddpd";
            assert.equal(string.longestPalindromicSubstring(), 3);
            string = "par";
            assert.equal(string.longestPalindromicSubstring(), 1);
        }
    );
    it(
        "should return the minimum deletion to make a string palindrome",
        function () {
            var string = "abdbca";
            assert.equal(string.minimumDeletionForPalindrome(), 1);
            string = "cddpd";
            assert.equal(string.minimumDeletionForPalindrome(), 2);
            string = "par";
            assert.equal(string.minimumDeletionForPalindrome(), 2);
        }
    );
    it(
        "should return the minimum palindromic cuts of a given string",
        function () {
            var string = "abdbca";
            assert.equal(string.minPalindromicCuts(), 3);
            string = "cddpd";
            assert.equal(string.minPalindromicCuts(), 2);
            string = "par";
            assert.equal(string.minPalindromicCuts(), 2);
            string = "pp";
            assert.equal(string.minPalindromicCuts(), 0);
        }
    );
    it(
        "should return the count of palindromic substring",
        function () {
            var string = "abdbca";
            assert.equal(string.palindromicSubstringCount(), 7);
            string = "cddpd";
            assert.equal(string.palindromicSubstringCount(), 7);
            string = "par";
            assert.equal(string.palindromicSubstringCount(), 3);
            string = "pp";
            assert.equal(string.palindromicSubstringCount(), 3);
        }
    );
    it(
        "should return the longest common substring of two given strings",
        function () {
            var string1 = "abdbca";
            var string2 = "cbda";
            assert.equal(string1.longestCommonSubstringWith(string2), 2);
            string1 = "passport";
            string2 = "ppsspt";
            assert.equal(string1.longestCommonSubstringWith(string2), 3);
            string1 = "abdbda";
            string2 = "abdc";
            assert.equal(string2.longestCommonSubstringWith(string1), 3);
        }
    );
    it(
        "should return the longest common subsequence of two given strings",
        function () {
            var string1 = "abdbca";
            var string2 = "cbda";
            assert.equal(string1.longestCommonSubsequenceWith(string2), 3);
            string1 = "passport";
            string2 = "ppsspt";
            assert.equal(string1.longestCommonSubsequenceWith(string2), 5);
            string1 = "abdbdc";
            string2 = "abde";
            assert.equal(string2.longestCommonSubsequenceWith(string1), 3);
        }
    );
    it(
        "should return the minimum deletions and insertions to" +
        " transform a string to another",
        function () {
            var string1 = "abdbca";
            var string2 = "cbda";
            assert.deepEqual(
                string1.minDeletionAndInsertionToEqual(string2),
                [3, 1]
            );
            string1 = "passport";
            string2 = "ppsspt";
            assert.deepEqual(
                string1.minDeletionAndInsertionToEqual(string2),
                [3, 1]
            );
            string1 = "abc";
            string2 = "fbc";
            assert.deepEqual(
                string1.minDeletionAndInsertionToEqual(string2),
                [1, 1]
            );
        }
    );
    it(
        "should return the length of shortest common" +
        " super sequence of two given strings",
        function () {
            var string1 = "abcf";
            var string2 = "bdcf";
            assert.equal(string1.shortestCommonSuperSequenceWith(string2), 5);
            string1 = "dynamic";
            string2 = "programming";
            assert.equal(string1.shortestCommonSuperSequenceWith(string2), 15);
        }
    );
});
describe(
    "longest increasing subsequence problems",
    function () {
        var initialInput = function () {
            return [4, 2, 3, 6, 10, 1, 12];
        };
        var inputs;
        it(
            "should return the length of the longest increasing subsequence",
            function () {
                assert.equal(initialInput().longestIncreasingSubsequence(), 5);
                inputs = [-4, 10, 3, 7, 15];
                assert.equal(inputs.longestIncreasingSubsequence(), 4);
            }
        );
        it(
            "should return the maximum sum of increasing elements in an array",
            function () {
                inputs = [4, 1, 2, 6, 10, 1, 12];
                assert.equal(inputs.maximumSumOfIncreasingSubsequence(), 32);
                inputs = [-4, 10, 3, 7, 15];
                assert.equal(inputs.maximumSumOfIncreasingSubsequence(), 25);
            }
        );
        it(
            "should return the minimum deletions to make a sequence sorted",
            function () {
                assert.equal(initialInput().minDeletionForSortedSequence(), 2);
                inputs = [-4, 10, 3, 7, 15];
                assert.equal(inputs.minDeletionForSortedSequence(), 1);
                inputs = [3, 2, 1, 0];
                assert.equal(inputs.minDeletionForSortedSequence(), 3);
            }
        );
        it(
            "should return the longest repeating" +
            " subsequence of a given sequence",
            function () {
                inputs = [..."tomorrow"];
                assert.equal(inputs.longestRepeatingSubsequence(), 2);
                inputs = [..."aabdbcec"];
                assert.equal(inputs.longestRepeatingSubsequence(), 3);
                inputs = [..."fmff"];
                assert.equal(inputs.longestRepeatingSubsequence(), 2);
            }
        );
        it(
            "should return the total of subsequences" +
            " matching a given pattern",
            function () {
                var text = "baxmx";
                var pattern = "ax";
                assert.equal(text.totalOfSubsequencesMatching(pattern), 2);
                text = "tomorrow";
                pattern = "tor";
                assert.equal(text.totalOfSubsequencesMatching(pattern), 4);
            }
        );
        it(
            "should return the longest bitonic subsequence" +
            " of a given array of numbers",
            function () {
                assert.equal(initialInput().longestBitonicSubsequence(), 5);
                inputs = [4, 2, 5, 9, 7, 6, 10, 3, 1];
                assert.equal(inputs.longestBitonicSubsequence(), 7);
            }
        );
        it(
            "should return the longest alternating" +
            " subsequence of a given array",
            function () {
                assert.equal(initialInput().longestAlternatingSubsequence(), 5);
                inputs = [3, 2, 1, 4];
                assert.equal(inputs.longestAlternatingSubsequence(), 3);
                inputs = [1, 3, 2, 4];
                assert.equal(inputs.longestAlternatingSubsequence(), 4);
            }
        );
        it(
            "should return the minimum modifications" +
            " we can do to a string to be another string",
            function () {
                var string1 = "bat";
                var string2 = "but";
                assert.equal(string1.minimumEditDistanceWith(string2), 1);
                string1 = "abdca";
                string2 = "cbda";
                assert.equal(string1.minimumEditDistanceWith(string2), 2);
                string1 = "passpot";
                string2 = "ppsspqrt";
                assert.equal(string1.minimumEditDistanceWith(string2), 3);
            }
        );
        it(
            "should check if a string is a shuffle of two other strings",
            function () {
                var string1 = "abcdef";
                var string2 = "abd";
                var string3 = "cef";
                assert.isTrue(string1.isAShuffleOf(string2, string3));
                string1 = "adcbef";
                assert.isFalse(string1.isAShuffleOf(string2, string3));
                string1 = "abdccf";
                assert.isFalse(string1.isAShuffleOf(string2, string3));
                string1 = "mnaobcdepf";
                string2 = "abcdef";
                string3 = "mnop";
                assert.isTrue(string1.isAShuffleOf(string2, string3));
            }

        );
    }
);
