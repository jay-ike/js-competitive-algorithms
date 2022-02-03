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

Array.prototype.maxSubArraySum = function (size) {
  return maximumArraySum(this, size);
};
