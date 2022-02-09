require("../utils");
function maximumArraySum(array, size) {
  let endIndex = 0,
    startIndex = 0,
    sum = 0;
  let currentMaxSum = Number.NEGATIVE_INFINITY;
  while (endIndex < array.length) {
    sum += array[endIndex];
    endIndex++;
    if (endIndex - startIndex >= size - 1) {
      currentMaxSum = Math.max(sum, currentMaxSum);
      sum -= array[startIndex];
    }
  }
  if (currentMaxSum === Number.NEGATIVE_INFINITY || size < 1) {
    throw RangeError(`cannot have a subarray of size ${size}`);
  }
  return currentMaxSum;
}
function totalElementsInBucket(bucket) {
  return Object.keys(bucket).reduce((previousValue, currentValue) => {
    return previousValue + bucket[currentValue];
  }, 0);
}
function maxElementsInBaskets(array, baskets) {
  var bucket = {},
    maxElements = 0,
    startIndex = 0,
    endIndex = 0;
  while (endIndex <= array.length) {
    if (
      Object.keys(bucket).length < baskets ||
      bucket[array[endIndex]] != null
    ) {
      bucket.incrementKeyValue(array[endIndex]);
      endIndex++;
    } else {
      maxElements = Math.max(totalElementsInBucket(bucket), maxElements);
      while (Object.keys(bucket).length >= baskets) {
        bucket.decrementKeyValue(array[startIndex]);
        startIndex++;
      }
    }
  }
  return maxElements;
}

function longestSubArrayAfterReplacement(array, replacements) {
  var startIndex = 0,
    endIndex = 0,
    result = Number.NEGATIVE_INFINITY,
    toBeReplaced = 0;
  while (endIndex < array.length) {
    if (toBeReplaced < replacements || array[endIndex] === 1) {
      toBeReplaced += array[endIndex] === 0 ? 1 : 0;
      endIndex++;
    } else {
      while (toBeReplaced >= replacements) {
        toBeReplaced -= array[startIndex] === 0 ? 1 : 0;
        startIndex++;
      }
    }
    result = Math.max(result, endIndex - startIndex);
  }
  return result;
}

Array.prototype.maxSubArraySum = function (size) {
  return maximumArraySum(this, size);
};

Array.prototype.maxElementsInBaskets = function (baskets = 2) {
  return maxElementsInBaskets(this, baskets);
};
Array.prototype.longestSubArrayAfterReplacement = function (replacements) {
  return longestSubArrayAfterReplacement(this, replacements);
};
