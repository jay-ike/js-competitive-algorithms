function maxProfitFittingCapacityHavingDistinctItems(
  profits,
  weights,
  capacity
) {
  var n = profits.length,
    dp = Array(capacity + 1).fill(0);
  if (capacity <= 0 || n === 0 || weights.length !== n) return 0;
  for (let i = 0; i <= capacity; i++) {
    if (weights[0] <= i) dp[i] = profits[0];
  }
  for (let i = 1; i < n; i++) {
    for (let c = capacity; c >= 0; c--) {
      let profit2 = 0,
        profit1 = 0;
      if (weights[i] <= c) profit1 = profits[i] + dp[c - weights[i]];
      profit2 = dp[c];
      dp[c] = Math.max(profit1, profit2);
    }
  }
  return dp[capacity];
}
function maxProfitFittingCapacityWithAnyItems(profits, weights, capacity) {
  var n = profits.length,
    dp = Array(capacity + 1).fill(0);
  for (let i = 1; i < dp.length; i++) {
    if (weights[0] > i) dp[i] = 0;
    else dp[i] = profits[0] + dp[i - weights[0]];
  }
  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      if (weights[i] <= c)
        dp[c] = Math.max(dp[c], profits[i] + dp[c - weights[i]]);
    }
  }
  return dp[capacity];
}
function allPossibleChangesOf(amount, denominations) {
  var n = denominations.length,
    dp = Array(amount + 1).fill(0);
  for (let i = 1; i < dp.length; i++) if (i % denominations[0] === 0) dp[i] = 1;
  for (let i = 1; i < n; i++) {
    let currentDenomination = denominations[i];
    for (let c = 1; c <= amount; c++) {
      if (currentDenomination === c) dp[c] = dp[c] + 1;
      else if (currentDenomination < c)
        dp[c] = dp[c] + dp[c - denominations[i]];
    }
  }
  return dp[amount];
}
function minDenominationsToChange(amount, denominations) {
  var n = denominations.length,
    dp = Array(amount + 1).fill(Number.POSITIVE_INFINITY);
  for (let i = 0; i < dp.length; i++) dp[i] = Math.floor(i / denominations[0]);
  for (let i = 1; i < n; i++) {
    let currentDenomination = denominations[i];
    for (let c = 1; c <= amount; c++) {
      if (currentDenomination <= c) {
        let currentChanges =
          Math.floor(c / currentDenomination) + dp[c % currentDenomination];
        if (dp[c] === 0) dp[c] = currentChanges;
        else dp[c] = Math.min(dp[c], currentChanges);
      }
    }
  }
  return dp[amount];
}
function maximumRibbonCuts(ribbonLength, cutLengths) {
  var cuts = cutLengths.length,
    dp = Array(ribbonLength + 1).fill(0);
  for (let i = 0; i < dp.length; i++) {
    if (i % cutLengths[0] === 0) dp[i] = i / cutLengths[0];
  }
  for (let i = 1; i < cuts; i++) {
    let currentCut = cutLengths[i];
    for (let c = 1; c <= ribbonLength; c++) {
      if (currentCut <= c) dp[c] = Math.max(1 + dp[c - currentCut], dp[c]);
    }
  }
  return dp[ribbonLength];
}
function fibonacciNumber(number) {
  if (number < 0) return Number.NEGATIVE_INFINITY;
  let previous = 0,
    current = 1,
    result;
  if (number === previous) return previous;
  if (number === current) return current;
  for (let i = 2; i <= number; i++) {
    result = current + previous;
    [previous, current] = [current, result];
  }
  return result;
}
function hasTwoPartitionsOfEqualSum(array) {
  let sum = array.reduce((prev, current) => current + prev, 0),
    length = array.length;
  if (sum % 2 !== 0) return false;
  sum /= 2;
  dp = Array(sum + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= sum; i++) dp[i] = array[0] === i;
  for (let i = 1; i < length; i++) {
    for (let j = sum; j >= 0; j--) {
      if (!dp[j] && j >= array[i]) dp[j] = dp[j - array[i]];
    }
  }
  return dp[sum];
}
function hasSubsetWithSum(array, sum) {
  if (array.length === 0) return false;
  let length = array.length;
  dp = Array(sum + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= sum; i++) dp[i] = array[0] === i;
  for (let i = 1; i < length; i++) {
    for (let j = sum; j >= 0; j--) {
      if (!dp[j] && j >= array[i]) dp[j] = dp[j - array[i]];
    }
  }
  return dp[sum];
}
function minimumDifferenceBetweenTwoSubSetSum(array) {
  let sum = array.reduce((prev, current) => prev + current, 0),
    halfSum = Math.floor(sum / 2);
  dp = Array(halfSum + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i < halfSum; i++) dp[i] = array[0] === i;
  for (let i = 1; i < array.length; i++) {
    for (let j = halfSum; j >= 0; j--) {
      if (!dp[j] && j >= array[i]) dp[j] = dp[j - array[i]];
    }
  }
  let index = halfSum;
  while (!dp[index]) {
    index--;
  }
  return Math.abs(2 * index - sum);
}
function countOfSubsetWithSum(array, sum) {
  var dp = Array(sum + 1).fill(0),
    arraySum = array.reduce((prev, current) => prev + current, 0);
  if (sum > arraySum) return 0;
  dp[0] = 1;
  for (let i = 1; i <= sum; i++) dp[i] = array[0] === i ? 1 : 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = sum; j >= 0; j--) {
      if (j >= array[i]) dp[j] = dp[j] + dp[j - array[i]];
    }
  }
  return dp[sum];
}
function numberOfSymbolsCombinationToHaveTheSum(array, sum) {
  var arraySum = array.reduce((prev, current) => prev + current, 0);
  if (sum > arraySum || (sum + arraySum) % 2 === 1) return 0;
  sum = (sum + arraySum) / 2;
  let dp = Array(sum + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= sum; i++) dp[i] = array[0] === i ? 1 : 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = sum; j >= 0; j--) {
      if (j >= array[i]) dp[j] += dp[j - array[i]];
    }
  }
  return dp[sum];
}
function totalWaysOfClimbingStairs(stairSteps) {
  if (stairSteps < 0) return 0;
  var step0 = 1,
    step1 = 1,
    step2 = 2,
    result = 0;
  if (stairSteps === 1 || stairSteps === 0) return step1;
  if (stairSteps === 2) return step2;
  for (let i = 3; i <= stairSteps; i++) {
    result = step0 + step1 + step2;
    step0 = step1;
    step1 = step2;
    step2 = result;
  }
  return result;
}
function totalWaysOfSummarizing(number) {
  if (number < 0) return 0;
  if (number === 1 || number === 2) return 1;
  if (number === 3) return 2;
  var sum0 = 1,
    sum1 = 1,
    sum3 = 2;
  for (let i = 4; i <= number; i++) {
    if (i % 4 === 0) result = sum0 + sum1 + sum3;
    else if (i % 4 === 1) result = sum1 + sum3;
    else if (i % 4 === 2) result = sum3;
    else result = sum0 + sum1;
    sum0 = sum1;
    sum1 = sum3;
    sum3 = result;
  }
  return result;
}
function minJumpsToReachTheEnd(jumps, initialIndex) {
  if (
    jumps[initialIndex] === 0 ||
    initialIndex >= jumps.length ||
    initialIndex < 0
  )
    return -1;
  var index = initialIndex,
    moves = 1;
  for (let i = initialIndex + 1; i < jumps.length; i++) {
    if (index + jumps[index] < i) {
      index += 1;
      moves += 1;
    }
  }
  return moves;
}
function minFeeToClimbStairs(stairSteps, stepFees) {
  if (
    stairSteps === 1 ||
    stairSteps === 2 ||
    stairSteps === 3 ||
    stairSteps === 0 ||
    stairSteps < stepFees.length
  )
    return -1;
  var step1 = stepFees[0],
    step2 = stepFees[1],
    step3 = stepFees[2],
    fee = stepFees[0];
  for (let i = 3; i < stairSteps; i++) {
    step1 = step2;
    step2 = step3;
    step3 = stepFees[i];
    if (i % 3 === 0) {
      fee += Math.min(step1, step2, step3);
    }
  }
  return fee;
}
function maxWealthSumInNonAdjacentHouses(wealths) {
  if (wealths.length <= 0) return -1;
  if (wealths.length === 1) return wealths[0];
  if (wealths.length === 2) return Math.max(wealths[0], wealths[1]);
  var wealth1 = wealths[0],
    wealth2 = Math.max(wealth1, wealths[1]);
  for (let i = 2; i < wealths.length; i++) {
    if (wealth1 + wealths[i] > wealth2) {
      let temp = wealth2;
      wealth2 = wealth1 + wealths[i];
      wealth1 = temp;
    } else {
      wealth1 = wealth2;
    }
  }
  return wealth2;
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
module.exports = {
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
};
