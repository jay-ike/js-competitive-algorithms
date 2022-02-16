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
function noDuplicateLength(array) {
  var startIndex = 0,
    endIndex = 1,
    result = 0;
  if ((array?.length ?? 0) === 0) return result;
  result = 1;
  while (endIndex < array.length) {
    if (array[endIndex] !== array[startIndex]) {
      result++;
      startIndex = endIndex;
    }
    endIndex++;
  }
  return result;
}

function indicesWithSum(array, sum) {
  if ((array?.length ?? 0) === 0) return [];
  var numbersDictionary = {},
    endIndex = 0,
    currentNumber,
    result = [];
  while (endIndex < array.length) {
    currentNumber = array[endIndex];
    if (numbersDictionary[sum - currentNumber] != null) {
      result.push(numbersDictionary[sum - currentNumber], endIndex);
    }
    numbersDictionary[array[endIndex]] = endIndex;
    endIndex++;
  }
  return result;
}
function rotateArray(arr, pivot) {
  var modulusPivot = 0;
  if (pivot > 0) {
    modulusPivot = pivot % arr.length;
  } else if (pivot < 0) {
    modulusPivot = arr.length + (pivot % arr.length);
  }
  return [...arr.slice(modulusPivot), ...arr.slice(0, modulusPivot)];
}
function sortedSquares(array) {
  var endIndex = array.length - 1,
    startIndex = 0,
    result = [];
  while (endIndex >= startIndex) {
    if (Math.pow(array[endIndex], 2) >= Math.pow(array[startIndex], 2)) {
      result.push(Math.pow(array[endIndex], 2));
      endIndex--;
    } else {
      result.push(Math.pow(array[startIndex], 2));
      startIndex++;
    }
  }
  return result.reverse();
}
function tripletsWhichSumIsZero(array) {
  array.sort((a, b) => a - b);
  var triplets = [];
  for (let index = 0; index < array.length; index++) {
    if (index > 0 && array[index] === array[index + 1]) continue;
    searchPairSum(array, index + 1, -array[index], triplets);
  }
  return triplets;
}

function searchPairSum(array, startIndex, targetSum, currentTriplets) {
  let endIndex = array.length - 1;
  while (endIndex > startIndex) {
    let currentSum = array[startIndex] + array[endIndex];
    if (currentSum === targetSum) {
      currentTriplets.push([-targetSum, array[startIndex], array[endIndex]]);
      endIndex--;
      startIndex++;
      while (array[startIndex] === array[startIndex - 1]) startIndex++;
      while (array[endIndex] === array[endIndex + 1]) endIndex--;
    } else if (currentSum > targetSum) {
      endIndex--;
    } else {
      startIndex++;
    }
  }
}
function smallestTripletSumCloseTo(array, target) {
  array.sort((a, b) => a - b);
  var sum = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < array.length; index++) {
    let endIndex = array.length - 1;
    let startIndex = index + 1;
    while (endIndex > startIndex) {
      let currentSum = array[index] + array[startIndex] + array[endIndex];
      if (currentSum > target) {
        endIndex--;
      } else {
        sum = Math.max(sum, currentSum);
        startIndex++;
      }
    }
  }
  return sum;
}
function tripletsSumSmallerThan(array, targetSum) {
  array.sort((a, b) => a - b);
  var triplets = [];
  for (let index = 0; index < array.length; index++) {
    let endIndex = array.length - 1;
    let startIndex = index + 1;
    while (endIndex > startIndex) {
      let currentSum = array[index] + array[startIndex] + array[endIndex];
      if (currentSum >= targetSum) {
        endIndex--;
      } else {
        for (let endMarker = endIndex; endMarker > startIndex; endMarker--) {
          triplets.push([array[index], array[startIndex], array[endMarker]]);
        }
        startIndex++;
      }
    }
  }
  return triplets;
}
function subArraysProductLessThan(array, target) {
  var result = [];
  for (let index = 0; index < array.length; index++) {
    let subArray = [],
      currentProduct = array[index],
      endIndex = index;
    while (currentProduct < target) {
      subArray.push(array[endIndex]);
      result.push([...subArray]);
      endIndex++;
      currentProduct *= array[endIndex];
    }
  }
  return result;
}
function sortInPlace(array) {
  var low = 0,
    index = 0,
    high = array.length - 1;
  while (index <= high) {
    if (array[index] === 0) {
      [array[low], array[index]] = [array[index], array[low]];
      index++;
      low++;
    } else if (array[index] === 1) {
      index++;
    } else {
      [array[high], array[index]] = [array[index], array[high]];
      high--;
    }
  }
  return array;
}
function quadrupletsWithSum(array, target) {
  array.sort((a, b) => a - b);
  var result = [];
  for (let first = 0; first <= array.length - 4; first++) {
    for (let second = first + 1; second <= array.length - 3; second++) {
      let startIndex = second + 1,
        endIndex = array.length - 1;
      while (startIndex < endIndex) {
        let currentSum =
          array[first] + array[second] + array[startIndex] + array[endIndex];
        if (target === currentSum) {
          result.push([
            array[first],
            array[second],
            array[startIndex],
            array[endIndex],
          ]);
          startIndex++;
          endIndex--;
          while (array[startIndex] === array[startIndex - 1]) startIndex++;
          while (array[endIndex] === array[endIndex + 1]) endIndex--;
        } else if (currentSum < target) {
          startIndex++;
        } else {
          endIndex--;
        }
      }
    }
  }
  return result;
}
function minimumArrayToBeSorted(array) {
  var startIndex = 0,
    endIndex = array.length - 1;
  while (
    array[startIndex] <= array[startIndex + 1] ||
    array[endIndex] >= array[endIndex - 1]
  ) {
    if (array[startIndex] <= array[startIndex + 1]) startIndex++;
    if (array[endIndex] >= array[endIndex - 1]) endIndex--;
    if (endIndex <= startIndex) return [];
  }

  startIndex =
    indexBiggerThan(
      array.slice(0, startIndex + 1),
      Math.min(array[startIndex], array[endIndex])
    ) ?? startIndex;
  endIndex =
    indexSmallerThan(array, Math.max(array[(startIndex, array[endIndex])])) ??
    endIndex;
  return array.slice(startIndex, endIndex + 1);
}
function indexSmallerThan(array, value) {
  for (let index = array.length - 1; index >= 0; index--) {
    if (array[index] < value) {
      return index;
    }
  }
}
function indexBiggerThan(array, value) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] > value) {
      return index;
    }
  }
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
Array.prototype.noDuplicateLength = function () {
  return noDuplicateLength(this);
};
Array.prototype.indicesWithSum = function (targetSum) {
  return indicesWithSum(this, targetSum);
};
Array.prototype.rotate = function (pivot) {
  return rotateArray(this, pivot);
};
Array.prototype.sortedSquares = function () {
  return sortedSquares(this);
};

Array.prototype.tripletsWhichSumIsZero = function () {
  return tripletsWhichSumIsZero(this);
};
Array.prototype.smallestTripletSumCloseTo = function (targetSum) {
  return smallestTripletSumCloseTo(this, targetSum);
};

Array.prototype.tripletsSumSmallerThan = function (targetSum) {
  return tripletsSumSmallerThan(this, targetSum);
};
Array.prototype.subArraysProductLessThan = function (targetSum) {
  return subArraysProductLessThan(this, targetSum);
};
Array.prototype.sortInPlace = function () {
  return sortInPlace(this);
};
Array.prototype.quadrupletsWithSum = function (targetSum) {
  return quadrupletsWithSum(this, targetSum);
};
Array.prototype.minimumArrayToBeSorted = function () {
  return minimumArrayToBeSorted(this);
};
