/*jslint
node, this
*/

"use strict";
const {
    longestRadiusFromCenter,
    nextCenterFromPalindrome
} = require("../utils");

function maxProfitFittingCapacityHavingDistinctItems(
    profits,
    weights,
    capacity
) {
    var profit1;
    var profit2;
    var dp = new Array(capacity + 1).fill(0);
    var i;
    var c;
    if (
        capacity <= 0 ||
        profits.length === 0 ||
        weights.length !== profits.length
    ) {
        return 0;
    }
    i = 0;
    while (i <= capacity) {
        if (weights[0] <= i) {
            dp[i] = profits[0];
        }
        i += 1;
    }
    i = 1;
    while (i < profits.length) {
        c = capacity;
        while (c >= 0) {
            profit2 = 0;
            profit1 = 0;
            if (weights[i] <= c) {
                profit1 = profits[i] + dp[c - weights[i]];
            }
            profit2 = dp[c];
            dp[c] = Math.max(profit1, profit2);
            c -= 1;
        }
        i += 1;
    }
    return dp[capacity];
}
function maxProfitFittingCapacityWithAnyItems(profits, weights, capacity) {
    var dp = new Array(capacity + 1).fill(0);
    var i = 1;
    var c;
    while (i < dp.length) {
        if (weights[0] > i) {
            dp[i] = 0;
        } else {
            dp[i] = profits[0] + dp[i - weights[0]];
        }
        i += 1;
    }
    i = 1;
    while (i < profits.length) {
        c = 1;
        while (c <= capacity) {
            if (weights[i] <= c) {
                dp[c] = Math.max(dp[c], profits[i] + dp[c - weights[i]]);
            }
            c += 1;
        }
        i += 1;
    }
    return dp[capacity];
}
function allPossibleChangesOf(amount, denominations) {
    var dp = new Array(amount + 1).fill(1);
    var currentDenomination;
    var i = 1;
    var c;
    dp[0] = 0;
    while (i < denominations.length) {
        currentDenomination = denominations[i];
        c = 1;
        while (c <= amount) {
            if (currentDenomination === c) {
                dp[c] = dp[c] + 1;
            }
            if (currentDenomination < c) {
                dp[c] = dp[c] + dp[c - denominations[i]];
            }
            c += 1;
        }
        i += 1;
    }
    return dp[amount];
}
function minDenominationsToChange(amount, denominations) {
    var currentDenomination;
    var currentChanges;
    var dp = new Array(amount + 1).fill(Number.POSITIVE_INFINITY);
    var i = 0;
    var c;
    while (i < dp.length) {
        dp[i] = Math.floor(i / denominations[0]);
        i += 1;
    }
    i = 1;
    while (i < denominations.length) {
        currentDenomination = denominations[i];
        c = 1;
        while (c <= amount) {
            if (currentDenomination <= c) {
                currentChanges = Math.floor(
                    c / currentDenomination
                ) + dp[c % currentDenomination];
                if (dp[c] === 0) {
                    dp[c] = currentChanges;
                } else {
                    dp[c] = Math.min(
                        dp[c],
                        currentChanges
                    );
                }
            }
            c += 1;
        }
        i += 1;
    }
    return dp[amount];
}
function maximumRibbonCuts(ribbonLength, cutLengths) {
    var currentCut;
    var dp = new Array(ribbonLength + 1).fill(0);
    var i = 0;
    var c;
    while (i < dp.length) {
        if (i % cutLengths[0] === 0) {
            dp[i] = i / cutLengths[0];
        }
        i += 1;
    }
    i = 1;
    while (i < cutLengths.length) {
        currentCut = cutLengths[i];
        c = 1;
        while (c <= ribbonLength) {
            if (currentCut <= c) {
                dp[c] = Math.max(1 + dp[c - currentCut], dp[c]);
            }
            c += 1;
        }
        i += 1;
    }
    return dp[ribbonLength];
}
function fibonacciNumber(number) {
    var previous;
    var current;
    var result;
    var i;
    if (number < 0) {
        return Number.NEGATIVE_INFINITY;
    }
    previous = 0;
    current = 1;
    if (number === previous) {
        return previous;
    }
    if (number === current) {
        return current;
    }
    i = 2;
    while (i <= number) {
        result = current + previous;
        [previous, current] = [current, result];
        i += 1;
    }
    return result;
}
function hasTwoPartitionsOfEqualSum(array) {
    var sum = array.reduce((prev, current) => current + prev, 0);
    var length = array.length;
    var dp = new Array(sum + 1).fill(false);
    var i = 1;
    var j;
    if (sum % 2 !== 0) {
        return false;
    }
    sum = sum / 2;
    dp[0] = true;
    while (i <= sum) {
        dp[i] = array[0] === i;
        i += 1;
    }
    i = 1;
    while (i < length) {
        j = sum;
        while (j >= 0) {
            if (!dp[j] && j >= array[i]) {
                dp[j] = dp[j - array[i]];
            }
            j -= 1;
        }
        i += 1;
    }
    return dp[sum];
}
function hasSubsetWithSum(array, sum) {
    var dp = new Array(sum + 1).fill(false);
    var i = 1;
    var j;
    if (array.length === 0) {
        return false;
    }
    dp[0] = true;
    while (i <= sum) {
        dp[i] = array[0] === i;
        i += 1;
    }
    i = 1;
    while (i < array.length) {
        j = sum;
        while (j >= 0) {
            if (!dp[j] && j >= array[i]) {
                dp[j] = dp[j - array[i]];
            }
            j -= 1;
        }
        i += 1;
    }
    return dp[sum];
}
function minimumDifferenceBetweenTwoSubSetSum(array) {
    var sum = array.reduce((prev, current) => prev + current, 0);
    var halfSum = Math.floor(sum / 2);
    var dp = new Array(halfSum + 1).fill(false);
    var i = 1;
    var j;
    dp[0] = true;
    while (i < halfSum) {
        dp[i] = array[0] === i;
        i += 1;
    }
    i = 1;
    while (i < array.length) {
        j = halfSum;
        while (j >= 0) {
            if (!dp[j] && j >= array[i]) {
                dp[j] = dp[j - array[i]];
            }
            j -= 1;
        }
        i += 1;
    }
    while (!dp[halfSum]) {
        halfSum -= 1;
    }
    return Math.abs(2 * halfSum - sum);
}
function countOfSubsetWithSum(array, sum) {
    var dp = new Array(sum + 1).fill(0);
    var arraySum = array.reduce((prev, current) => prev + current, 0);
    var i = 1;
    var j;
    if (sum > arraySum) {
        return 0;
    }
    dp[0] = 1;
    while (i <= sum) {
        dp[i] = (
            array[0] === i
            ? 1
            : 0
        );
        i += 1;
    }
    i = 1;
    while (i < array.length) {
        j = sum;
        while (j >= 0) {
            if (j >= array[i]) {
                dp[j] = dp[j] + dp[j - array[i]];
            }
            j -= 1;
        }
        i += 1;
    }
    return dp[sum];
}
function numberOfSymbolsCombinationToHaveTheSum(array, sum) {
    var arraySum = array.reduce((prev, current) => prev + current, 0);
    var dp = new Array(sum + 1).fill(0);
    var i = 1;
    var j;
    if (sum > arraySum || (sum + arraySum) % 2 === 1) {
        return 0;
    }
    sum = (sum + arraySum) / 2;
    dp[0] = 1;
    while (i <= sum) {
        dp[i] = (
            array[0] === i
            ? 1
            : 0
        );
        i += 1;
    }
    i = 1;
    while (i < array.length) {
        j = sum;
        while (j >= 0) {
            if (j >= array[i]) {
                dp[j] += dp[j - array[i]];
            }
            j -= 1;
        }
        i += 1;
    }
    return dp[sum];
}
function totalWaysOfClimbingStairs(stairSteps) {
    var step1;
    var step0;
    var step2;
    var result;
    var i;
    if (stairSteps < 0) {
        return 0;
    }
    step0 = 1;
    step1 = 1;
    step2 = 2;
    result = 0;
    if (stairSteps === 1 || stairSteps === 0) {
        return step1;
    }
    if (stairSteps === 2) {
        return step2;
    }
    i = 3;
    while (i <= stairSteps) {
        result = step0 + step1 + step2;
        step0 = step1;
        step1 = step2;
        step2 = result;
        i += 1;
    }
    return result;
}
function totalWaysOfSummarizing(number) {
    var sum0;
    var sum1;
    var sum3;
    var i = 4;
    var result;
    if (number < 0) {
        return 0;
    }
    if (number === 1 || number === 2) {
        return 1;
    }
    if (number === 3) {
        return 2;
    }
    sum0 = 1;
    sum1 = 1;
    sum3 = 2;
    while (i <= number) {
        if (i % 4 === 0) {
            result = sum0 + sum1 + sum3;
        } else if (i % 4 === 1) {
            result = sum1 + sum3;
        } else if (i % 4 === 2) {
            result = sum3;
        } else {
            result = sum0 + sum1;
        }
        sum0 = sum1;
        sum1 = sum3;
        sum3 = result;
        i += 1;
    }
    return result;
}
function minJumpsToReachTheEnd(jumps, initialIndex) {
    var index;
    var moves;
    var i;
    if (
        jumps[initialIndex] === 0 ||
        initialIndex >= jumps.length ||
        initialIndex < 0
    ) {
        return -1;
    }
    index = initialIndex;
    moves = 1;
    i = initialIndex;
    while (i < jumps.length) {
        if (index + jumps[index] < i) {
            index += 1;
            moves += 1;
        }
        i += 1;
    }
    return moves;
}
function minFeeToClimbStairs(stairSteps, stepFees) {
    var step1;
    var step2;
    var step3;
    var fee;
    var i = 3;
    if (
        stairSteps === 1 ||
        stairSteps === 2 ||
        stairSteps === 3 ||
        stairSteps === 0 ||
        stairSteps < stepFees.length
    ) {
        return -1;
    }
    step1 = stepFees[0];
    step2 = stepFees[1];
    step3 = stepFees[2];
    fee = stepFees[0];
    while (i < stairSteps) {
        step1 = step2;
        step2 = step3;
        step3 = stepFees[i];
        if (i % 3 === 0) {
            fee += Math.min(step1, step2, step3);
        }
        i += 1;
    }
    return fee;
}
function maxWealthSumInNonAdjacentHouses(wealths) {
    var wealth1;
    var wealth2;
    var temp;
    var i = 2;
    if (wealths.length <= 0) {
        return -1;
    }
    if (wealths.length === 1) {
        return wealths[0];
    }
    if (wealths.length === 2) {
        return Math.max(wealths[0], wealths[1]);
    }
    wealth1 = wealths[0];
    wealth2 = Math.max(wealth1, wealths[1]);
    while (i < wealths.length) {
        if (wealth1 + wealths[i] > wealth2) {
            temp = wealth2;
            wealth2 = wealth1 + wealths[i];
            wealth1 = temp;
        } else {
            wealth1 = wealth2;
        }
        i += 1;
    }
    return wealth2;
}
function longestPalindromicSubsequence(str) {
    var length = str.length;
    var dp = new Array(length).fill(0);
    var firstPalindromeChar = str[0];
    var i = 1;
    var j;
    dp[0] = 1;
    while (i < str.length) {
        if (dp[i - 1] === 1) {
            firstPalindromeChar = str[i - 1];
        }
        j = 0;
        while (j < i) {
            if (str[j] === str[i]) {
                if (str[j] === firstPalindromeChar) {
                    dp[i] = dp[i - 1] + 1;
                } else {
                    dp[i] = 2 + dp[i - 1];
                    firstPalindromeChar = str[j];
                }
                break;
            }
            if (str[j] !== str[i]) {
                dp[i] = Math.max(dp[i], dp[i - 1]);
            }
            j += 1;
        }
        i += 1;
    }
    return dp[length - 1];
}
function longestPalindromicSubstring(str, separator = "|") {
    var newString = `${separator}${[...str].join(separator)}${separator}`;
    var palindromeRadii = new Array(newString.length).fill(0);
    var center = 0;
    var radius = 0;
    var oldCenter;
    var oldRadius;
    while (center < newString.length) {
        radius = longestRadiusFromCenter(
            newString,
            center,
            radius
        );
        palindromeRadii[center] = radius;
        oldCenter = center;
        oldRadius = radius;
        center += 1;
        radius = 0;
        [center, radius] = nextCenterFromPalindrome(
            center,
            oldCenter,
            oldRadius,
            palindromeRadii
        );
    }
    return Math.max(...palindromeRadii);
}
function minimumDeletionForPalindrome(string) {
    return string.length - longestPalindromicSubsequence(string);
}
function minPalindromicCuts(string) {
    var cuts;
    var i = 0;
    var j;
    if (string === null || string.length <= 1) {
        return 0;
    }
    cuts = new Array(string.length + 1);
    while (i <= string.length) {
        cuts[i] = i - 1;
        i += 1;
    }
    i = 0;
    while (i < string.length) {
        j = 0;
        while (
            i - j >= 0 &&
            i + j < string.length &&
            string[i - j] === string[i + j]
        ) {
            cuts[i + j + 1] = Math.min(
                cuts[i + j + 1],
                1 + cuts[i - j]
            );
            j += 1;
        }
        j = 1;
        while (
            i - j + 1 >= 0 &&
            i + j < string.length &&
            string[i - j + 1] === string[i + j]
        ) {
            cuts[i + j + 1] = Math.min(
                cuts[i + j + 1],
                1 + cuts[i - j + 1]
            );
            j += 1;
        }
        i += 1;
    }
    return cuts[string.length];
}
function palindromicSubstringCount(string, separator = "#") {
    var transformedText = `${separator}${[...string].join(
        separator
    )}${separator}`;
    var allRadii = new Array(
        transformedText.length
    ).fill(0);
    var center = 0;
    var radius = 0;
    var palindromes = 0;
    var oldCenter;
    var oldRadius;
    while (center < transformedText.length) {
        radius = longestRadiusFromCenter(
            transformedText,
            center,
            radius
        );
        if (radius > 1) {
            palindromes += 1;
        }
        allRadii[center] = radius;
        oldCenter = center;
        oldRadius = radius;
        center += 1;
        radius = 0;
        [center, radius] = nextCenterFromPalindrome(
            center,
            oldCenter,
            oldRadius,
            allRadii
        );
    }
    return string.length + palindromes;
}
function longestCommonSubstringWith(string1, string2) {
    var dp;
    var longestLength;
    var i = 1;
    var j;
    if (string1.length === 0 || string2.length === 0) {
        return 0;
    }
    dp = new Array(string1.length + 1).fill(0);
    longestLength = 0;
    while (i <= string1.length) {
        j = 1;
        while (j <= string2.length) {
            if (string1[i - 1] === string2[j - 1]) {
                if (
                    j >= 2
                    && i >= 2
                    && string1[i - 2] === string2[j - 2]
                ) {
                    dp[i] = 1 + dp[i - 1];
                } else {
                    dp[i] = Math.max(1, dp[i]);
                }
            }
            j += 1;
        }
        longestLength = Math.max(longestLength, dp[i]);
        i += 1;
    }
    return longestLength;
}
function longestCommonSubsequenceWith(string1, string2) {
    var dp;
    var matchIndex;
    var i = 1;
    var j;
    if (string1.length === 0 || string2.length === 0) {
        return 0;
    }
    dp = new Array(string1.length + 1).fill(0);
    matchIndex = 0;
    while (i <= string1.length) {
        j = 1;
        while (j <= string2.length) {
            if (string1[i - 1] === string2[j - 1]) {
                if (j >= matchIndex && dp[i] - dp[i - 1] <= 0) {
                    dp[i] = dp[i] + 1;
                } else {
                    dp[i] = Math.max(1, dp[i]);
                }
                matchIndex = j;
            } else {
                dp[i] = Math.max(dp[i], dp[i - 1]);
            }
            j += 1;
        }
        i += 1;
    }
    return dp[string1.length];
}
function minDeletionAndInsertionToEqual(string1, string2) {
    var lcs = string1.longestCommonSubsequenceWith(string2);
    return [string1.length - lcs, string2.length - lcs];
}
function longestIncreasingSubsequence(array) {
    var dp;
    var i = 1;
    var j;
    if (array.length <= 1) {
        return array.length;
    }
    dp = new Array(array.length);
    dp[0] = 1;
    while (i < array.length) {
        dp[i] = 1;
        j = 0;
        while (j < i) {
            if (array[i] > array[j] && dp[i] <= dp[j]) {
                dp[i] = 1 + dp[j];
            }
            j += 1;
        }
        i += 1;
    }
    return dp[array.length - 1];
}
function maximumSumOfIncreasingSubsequence(array) {
    var dp;
    var i = 1;
    var j;
    if (array.length === 0) {
        return 0;
    }
    dp = new Array(array.length);
    dp[0] = array[0];
    while (i < array.length) {
        dp[i] = 0;
        j = 0;
        while (j < i) {
            if (array[i] > array[j] && dp[i] < dp[j]) {
                dp[i] = array[j] + dp[i];
            }
            j += 1;
        }
        dp[i] = Math.max(dp[i - 1], dp[i] + array[i]);
        i += 1;
    }
    return dp[array.length - 1];
}
function shortestCommonSuperSequenceWith(string1, string2) {
    var result = string2.length;
    var previousMatchedIndex = -1;
    var matched;
    var currentMatchedIndex;
    var i = 0;
    var j;
    while (i < string1.length) {
        matched = false;
        currentMatchedIndex = previousMatchedIndex;
        j = 0;
        while (j < string2.length) {
            if (string2[j] === string1[i]) {
                matched = true;
                currentMatchedIndex = j;
                break;
            }
            j += 1;
        }
        if (
            !matched ||
            (matched && currentMatchedIndex < previousMatchedIndex)
        ) {
            result += 1;
        }
        previousMatchedIndex = currentMatchedIndex;
        i += 1;
    }
    return result;
}
function minDeletionForSortedSequence(array) {
    var lis;
    if (array.length <= 1) {
        return 0;
    }
    lis = longestIncreasingSubsequence(array);
    return array.length - lis;
}
function longestRepeatingSubsequence(array) {
    var dp = new Array(array.length).fill(0);
    var matchIndex = -1;
    var i = 0;
    var j;
    while (i < array.length) {
        j = i + 1;
        while (j < array.length) {
            if (array[i] === array[j]) {
                if (j >= matchIndex && i > 0) {
                    dp[i] = 1 + dp[i - 1];
                } else {
                    dp[i] = 1;
                }
                matchIndex = j;
                break;
            }
            j += 1;
        }
        if (i > 0) {
            dp[i] = Math.max(dp[i], dp[i - 1]);
        }
        i += 1;
    }
    return dp[array.length - 1];
}
function totalOfSubsequencesMatching(string, pattern) {
    var dp;
    var i = 0;
    var j;
    if (pattern.length === 0) {
        return 1;
    }
    if (string.length === 0 || string.length < pattern.length) {
        return 0;
    }
    dp = new Array(string.length + 1).fill(0).map(
        () => new Array(pattern.length + 1).fill(0)
    );
    while (i <= string.length) {
        dp[i][0] = 1;
        i += 1;
    }
    i = 1;
    while (i <= string.length) {
        j = 1;
        while (j <= pattern.length) {
            if (string[i - 1] === pattern[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            dp[i][j] += dp[i - 1][j];
            j += 1;
        }
        i += 1;
    }
    return dp[string.length][pattern.length];
}
function longestBitonicSubsequence(array) {
    var decreasingLengthsRev = new Array(array.length);
    var decreasingLengths = new Array(array.length);
    var maxLength = 0;
    var i = 0;
    var j;
    while (i < array.length) {
        decreasingLengths[i] = 1;
        j = i - 1;
        while (j >= 0) {
            if (array[j] < array[i]) {
                decreasingLengths[i] = Math.max(
                    decreasingLengths[i],
                    decreasingLengths[j] + 1
                );
            }
            j -= 1;
        }
        i += 1;
    }
    i = array.length;
    while (i >= 0) {
        decreasingLengthsRev[i] = 1;
        j = i + 1;
        while (j < array.length) {
            if (array[j] < array[i]) {
                decreasingLengthsRev[i] = Math.max(
                    decreasingLengthsRev[i],
                    decreasingLengthsRev[j] + 1
                );
            }
            j += 1;
        }
        i -= 1;
    }
    i = 0;
    while (i < array.length) {
        maxLength = Math.max(
            maxLength,
            decreasingLengths[i] + decreasingLengthsRev[i] - 1
        );
        i += 1;
    }
    return maxLength;
}
function longestAlternatingSubsequence(array) {
    var decreasingOrder = new Array(array.length);
    var increasingOrder = new Array(array.length);
    var maxLength = 0;
    var i = 0;
    var j;
    while (i < array.length) {
        decreasingOrder[i] = 1;
        increasingOrder[i] = 1;
        j = 0;
        while (j < i) {
            if (array[i] > array[j]) {
                increasingOrder[i] = Math.max(
                    increasingOrder[i],
                    decreasingOrder[j] + 1
                );
                maxLength = Math.max(maxLength, increasingOrder[i]);
            } else if (array[i] < array[j]) {
                decreasingOrder[i] = Math.max(
                    decreasingOrder[i],
                    increasingOrder[j] + 1
                );
                maxLength = Math.max(maxLength, decreasingOrder[i]);
            }
            j += 1;
        }
        i += 1;
    }
    return maxLength;
}
function minimumEditDistanceWith(string1, string2) {
    var dp = new Array(string1.length + 1).fill(0).map(
        () => new Array(string2.length + 1).fill(0)
    );
    var count;
    var i = 1;
    var j;
    while (i <= string2.length) {
        dp[0][i] = i;
        i += 1;
    }
    i = 1;
    while (i <= string1.length) {
        dp[i][0] = i;
        j = 1;
        while (j <= string2.length) {
            count = 0;
            if (string1[i - 1] !== string2[j - 1]) {
                count = 1;
            }
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + count
            );
            j += 1;
        }
        i += 1;
    }
    return dp[string1.length][string2.length];
}
function isAShuffleOf(string1, string2, string3) {
    var len1 = string1.length;
    var len2 = string2.length;
    var len3 = string3.length;
    var dp;
    var i = 0;
    var j;
    if (len2 === 0) {
        return string1 === string3;
    }
    if (len3 === 0) {
        return string1 === string2;
    }
    if (len2 + len3 !== len1) {
        return false;
    }
    dp = new Array(string2.length + 1).fill(0).map(
        () => new Array(string3.length + 1).fill(false)
    );
    while (i <= len2) {
        j = 0;
        while (j <= len3) {
            if (i === 0) {
                dp[i][j] = string1.slice(0, j) === string3.slice(0, j);
            }
            if (j === 0) {
                dp[i][j] = string1.slice(0, i) === string2.slice(0, i);
            } else {
                dp[i][j] = (
                    string1[i + j - 1] === string2[i - 1] && dp[i - 1][j]
                ) ||
                (string1[i + j - 1] === string3[j - 1] && dp[i][j - 1]);
            }
            j += 1;
        }
        i += 1;
    }
    return dp[len2][len3];
}
Array.prototype.hasTwoPartitionsOfEqualSum = function () {
    return hasTwoPartitionsOfEqualSum(this);
};
Array.prototype.hasSubsetWithSum = function (sum) {
    return hasSubsetWithSum(this, sum);
};
Array.prototype.minimumDifferenceBetweenTwoSubSetSum = function () {
    return minimumDifferenceBetweenTwoSubSetSum(this);
};
Array.prototype.countOfSubsetWithSum = function (sum) {
    return countOfSubsetWithSum(this, sum);
};
Array.prototype.numberOfSymbolsCombinationToHaveTheSum = function (sum) {
    return numberOfSymbolsCombinationToHaveTheSum(this, sum);
};
Array.prototype.longestIncreasingSubsequence = function () {
    return longestIncreasingSubsequence(this);
};
Array.prototype.maximumSumOfIncreasingSubsequence = function () {
    return maximumSumOfIncreasingSubsequence(this);
};
Array.prototype.minDeletionForSortedSequence = function () {
    return minDeletionForSortedSequence(this);
};
Array.prototype.longestRepeatingSubsequence = function () {
    return longestRepeatingSubsequence(this);
};
Array.prototype.longestBitonicSubsequence = function () {
    return longestBitonicSubsequence(this);
};
Array.prototype.longestAlternatingSubsequence = function () {
    return longestAlternatingSubsequence(this);
};
String.prototype.longestPalindromicSubsequence = function () {
    return longestPalindromicSubsequence(this);
};
String.prototype.longestPalindromicSubstring = function () {
    return longestPalindromicSubstring(this);
};
String.prototype.minimumDeletionForPalindrome = function () {
    return minimumDeletionForPalindrome(this);
};
String.prototype.minPalindromicCuts = function () {
    return minPalindromicCuts(this);
};
String.prototype.palindromicSubstringCount = function () {
    return palindromicSubstringCount(this);
};
String.prototype.longestCommonSubstringWith = function (otherString) {
    return longestCommonSubstringWith(this, otherString);
};
String.prototype.longestCommonSubsequenceWith = function (otherString) {
    return longestCommonSubsequenceWith(this, otherString);
};
String.prototype.minDeletionAndInsertionToEqual = function (otherString) {
    return minDeletionAndInsertionToEqual(this, otherString);
};
String.prototype.shortestCommonSuperSequenceWith = function (otherString) {
    return shortestCommonSuperSequenceWith(this, otherString);
};
String.prototype.totalOfSubsequencesMatching = function (pattern) {
    return totalOfSubsequencesMatching(this, pattern);
};
String.prototype.minimumEditDistanceWith = function (otherString) {
    return minimumEditDistanceWith(this, otherString);
};
String.prototype.isAShuffleOf = function (string1, string2) {
    return isAShuffleOf(this, string1, string2);
};
module.exports = {
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
};
