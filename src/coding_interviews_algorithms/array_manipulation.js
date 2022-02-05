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
Array.prototype.maxSubArraySum = function (size) {
  return maximumArraySum(this, size);
};

Array.prototype.maxElementsInBaskets = function (baskets = 2) {
  return maxElementsInBaskets(this, baskets);
};
