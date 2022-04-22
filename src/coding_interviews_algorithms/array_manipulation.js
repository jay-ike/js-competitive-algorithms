const {
  interval,
  buildHeap,
  job,
  buildArrayReader,
  positionInSortedArray,
} = require("../utils");
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
  var sortedArray = [...array].sort((a, b) => a - b);
  var triplets = [];
  for (let index = 0; index < sortedArray.length; index++) {
    if (index > 0 && sortedArray[index] === sortedArray[index + 1]) continue;
    searchPairSum(sortedArray, index + 1, -sortedArray[index], triplets);
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
  var sortedArray = [...array].sort((a, b) => a - b);
  var sum = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < sortedArray.length; index++) {
    let endIndex = sortedArray.length - 1;
    let startIndex = index + 1;
    while (endIndex > startIndex) {
      let currentSum =
        sortedArray[index] + sortedArray[startIndex] + sortedArray[endIndex];
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
  var sortedArray = [...array].sort((a, b) => a - b);
  var triplets = [];
  for (let index = 0; index < sortedArray.length; index++) {
    let endIndex = sortedArray.length - 1;
    let startIndex = index + 1;
    while (endIndex > startIndex) {
      let currentSum =
        sortedArray[index] + sortedArray[startIndex] + sortedArray[endIndex];
      if (currentSum >= targetSum) {
        endIndex--;
      } else {
        for (let endMarker = endIndex; endMarker > startIndex; endMarker--) {
          triplets.push([
            sortedArray[index],
            sortedArray[startIndex],
            sortedArray[endMarker],
          ]);
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
  var sortedArray = [...array].sort((a, b) => a - b);
  var result = [];
  for (let first = 0; first <= sortedArray.length - 4; first++) {
    for (let second = first + 1; second <= sortedArray.length - 3; second++) {
      let startIndex = second + 1,
        endIndex = sortedArray.length - 1;
      while (startIndex < endIndex) {
        let currentSum =
          sortedArray[first] +
          sortedArray[second] +
          sortedArray[startIndex] +
          sortedArray[endIndex];
        if (target === currentSum) {
          result.push([
            sortedArray[first],
            sortedArray[second],
            sortedArray[startIndex],
            sortedArray[endIndex],
          ]);
          startIndex++;
          endIndex--;
          while (sortedArray[startIndex] === sortedArray[startIndex - 1])
            startIndex++;
          while (sortedArray[endIndex] === sortedArray[endIndex + 1])
            endIndex--;
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
function hasCycle(array) {
  for (let index = 0; index < array.length; index++) {
    let isForward = array[index] >= 0;
    let fast = index,
      slow = index;
    while (true) {
      slow = nextIndex(array, isForward, slow);
      fast = nextIndex(array, isForward, fast);
      if (fast !== -1) {
        fast = nextIndex(array, isForward, fast);
      }
      if (slow === -1 || fast === -1 || fast === slow) break;
    }
    if (slow !== -1 && fast === slow) return true;
  }
  return false;
}
function nextIndex(array, isForward, currentIndex) {
  var direction = array[currentIndex] >= 0,
    nextPosition;
  if (isForward !== direction) return -1;
  nextPosition = (currentIndex + array[currentIndex]) % array.length;
  if (nextPosition < 0) {
    nextPosition += array.length;
  }
  if (nextPosition === currentIndex) return -1;
  return nextPosition;
}
function mergeOverlappingIntervals(intervals) {
  var result = [];
  let sortedIntervals = intervals
      .map(interval)
      .sort((a, b) => a.begin - b.begin),
    start = sortedIntervals[0].begin,
    end = sortedIntervals[0].end;
  for (let index = 1; index < sortedIntervals.length; index++) {
    let currentInterval = sortedIntervals[index];
    if (currentInterval.begin <= end) {
      end = Math.max(currentInterval.end, end);
    } else {
      result.push([start, end]);
      start = currentInterval.begin;
      end = currentInterval.end;
    }
  }
  result.push([start, end]);
  return result;
}
function hasOverlappingIntervals(intervals) {
  var sortedIntervals = [...intervals]
    .map(interval)
    .sort((a, b) => a.begin - b.begin);
  for (let index = 1; index < sortedIntervals.length; index++) {
    if (sortedIntervals[index].begin < sortedIntervals[index - 1].end)
      return true;
  }
  return false;
}
function minimumRoomHoldingIntervals(intervals) {
  var minimumRoom = 0;
  var sortedIntervals = [...intervals]
    .map(interval)
    .sort((a, b) => a.begin - b.begin);
  const heap = buildHeap([], (a, b) => a.end < b.end);
  for (let index = 0; index < sortedIntervals.length; index++) {
    let begin = sortedIntervals[index].begin;
    while (heap.length() > 0 && begin >= heap.peek().end) {
      heap.pop();
    }
    heap.push(sortedIntervals[index]);
    minimumRoom = Math.max(heap.length(), minimumRoom);
  }
  return minimumRoom;
}

function maximumCpuLoad(jobs) {
  var maxLoad = 0,
    currentLoad = 0,
    sortedJobs = [...jobs].map(job).sort((a, b) => a.begin - b.begin),
    heap = buildHeap([], (a, b) => a.end < b.end);
  for (let i = 0; i < sortedJobs.length; i++) {
    let currentJob = sortedJobs[i];
    while (heap.length() > 0 && currentJob.begin >= heap.peek().end) {
      currentLoad -= heap.pop().load;
    }
    heap.push(currentJob);
    currentLoad += currentJob.load;
    maxLoad = Math.max(maxLoad, currentLoad);
  }
  return maxLoad;
}
function freeIntervals(schedules) {
  function employeeInterval(employeeInterval, employeeIndex, intervalIndex) {
    return {
      employeeIndex,
      interval: interval(employeeInterval),
      intervalIndex,
    };
  }
  var heap = buildHeap([], (a, b) => a.interval.begin < b.interval.begin),
    result = [];
  for (let i = 0; i < schedules.length; i++) {
    heap.push(employeeInterval(schedules[i][0], i, 0));
  }
  let previousInterval = heap.peek().interval;
  while (heap.length() > 0) {
    let heapTop = heap.pop();
    if (previousInterval.end < heapTop.interval.begin) {
      result.push([previousInterval.end, heapTop.interval.begin]);
      previousInterval = heapTop.interval;
    } else {
      if (previousInterval.end < heapTop.interval.end) {
        previousInterval = heapTop.interval;
      }
    }
    let employeeSchedule = schedules[heapTop.employeeIndex];
    if (employeeSchedule.length > heapTop.intervalIndex + 1) {
      heap.push(
        employeeInterval(
          schedules[heapTop.employeeIndex][heapTop.intervalIndex + 1],
          heapTop.employeeIndex,
          heapTop.intervalIndex + 1
        )
      );
    }
  }
  return result;
}
function mergeOverlappingIntervalsAfterInsert(intervals, newInterval) {
  var nextPosition = 0,
    result = [],
    start,
    end;

  while (
    nextPosition < intervals.length &&
    intervals[nextPosition][1] < newInterval[0]
  ) {
    start = intervals[nextPosition][0];
    end = intervals[nextPosition][1];
    result.push([start, end]);
    nextPosition++;
  }
  start = Math.min(newInterval[0], intervals[nextPosition][0]);
  end = Math.max(newInterval[1], intervals[nextPosition][1]);
  nextPosition++;

  for (let index = nextPosition; index < intervals.length; index++) {
    let newStart = intervals[nextPosition][0],
      newEnd = intervals[nextPosition][1];
    if (newStart <= end) {
      end = Math.max(end, newEnd);
    } else {
      result.push([start, end]);
      start = newStart;
      end = newEnd;
    }
  }
  result.push([start, end]);

  return result;
}
function intersectionWithInterval(intervals, otherIntervals) {
  var result = [],
    firstIndex = 0,
    secondIndex = 0;
  while (firstIndex < intervals.length && secondIndex < otherIntervals.length) {
    let start = intervals[firstIndex][0],
      end = intervals[firstIndex][1],
      otherStart = otherIntervals[secondIndex][0],
      otherEnd = otherIntervals[secondIndex][1];
    let firstOverlapSecond = start >= otherStart && start <= otherEnd,
      secondOverlapFirst = otherStart >= start && otherStart <= end;
    if (firstOverlapSecond || secondOverlapFirst) {
      result.push([Math.max(start, otherStart), Math.min(end, otherEnd)]);
    }
    if (end < otherEnd) {
      firstIndex++;
    } else {
      secondIndex++;
    }
  }
  return result;
}
function cyclicSort(array) {
  var index = 0,
    comparator = defaultComparator(array);
  cyclicSwap(index, array, (index) => array[index] - 1, comparator);
}
function missingNumber(array) {
  var index = 0,
    n = array.length,
    comparator = (index, iterator) =>
      array[index] < n && array[index] !== array[iterator];
  cyclicSwap(index, array, (index) => array[index], comparator);
  for (let index = 0; index < array.length; index++) {
    if (array[index] !== index) return index;
  }
  return n;
}
var defaultComparator = (array) => {
  let result = (index, iterator) => array[index] !== array[iterator];
  return result;
};
/**
 *
 * @param {Array} array
 * @returns Array<Number>
 * @description find all missing numbers in an array ranged from 1 to n
 *
 */
function allMissingNumbers(array) {
  var result = [],
    index = 0,
    comparator = defaultComparator(array);
  cyclicSwap(index, array, (index) => array[index] - 1, comparator);
  for (let index = 0; index < array.length; index++) {
    if (array[index] !== index + 1) result.push(index + 1);
  }
  return result;
}
function cyclicSwap(index, array, iterator, comparator) {
  while (index < array.length) {
    let j = iterator(index);
    if (comparator(index, j)) {
      [array[index], array[j]] = [array[j], array[index]];
    } else index++;
  }
  return index;
}

function duplicatedNumber(array) {
  var index = 0;
  while (index < array.length) {
    if (array[index] !== index + 1) {
      let j = array[index] - 1;
      if (array[index] !== array[j]) {
        [array[index], array[j]] = [array[j], array[index]];
      } else return array[index];
    } else index++;
  }
  return -1;
}
function findCorruptPair(array) {
  let index = 0,
    result = [],
    comparator = defaultComparator(array);
  cyclicSwap(index, array, (index) => array[index] - 1, comparator);
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== i + 1) result = [array[i], i + 1];
  }
  return result;
}
function firstKPositiveMissingNumbers(array, k) {
  let index = 0,
    totalSeen = 0,
    extraNumbers = {},
    result = [],
    n = array.length,
    comparator = (index, iterator) =>
      array[index] > 0 &&
      array[index] - 1 < n &&
      array[index] !== array[iterator];
  cyclicSwap(index, array, (index) => array[index] - 1, comparator);
  for (let j = 0; j < array.length; j++) {
    if (array[j] !== j + 1 && totalSeen < k) {
      result.push(j + 1);
      totalSeen++;
    }
    if (array[j] >= n + 1) {
      extraNumbers[array[j]] = j;
    }
  }
  while (totalSeen < k) {
    if (extraNumbers[n + 1] == null) {
      result.push(n + 1);
      totalSeen++;
    }
    n++;
  }
  return result;
}
function nextIntervalIndices(intervals) {
  var maxStarts = buildHeap([], (a, b) => a[0] > b[0]),
    maxEnds = buildHeap([], (a, b) => a[0] > b[0]),
    result = [...intervals].fill(-1);
  for (let i = 0; i < intervals.length; i++) {
    maxStarts.push([intervals[i][0], i]);
    maxEnds.push([intervals[i][1], i]);
  }
  for (let i = 0; intervals.length; i++) {
    let [topEnd, endIndex] = maxEnds.pop();
    if (maxStarts.peek()[0] >= topEnd) {
      let [topStart, startIndex] = maxStarts.pop();
      while (maxStarts.length() && maxStarts.peek()[0] >= topEnd) {
        [topStart, startIndex] = maxStarts.pop();
      }
      result[endIndex] = startIndex;
      maxStarts.push([topStart, startIndex]);
    }
    if (maxEnds.length() <= 0) break;
  }
  return result;
}
function allSubsets(array) {
  var subsets = [[]],
    sortedArray = [...array].sort(),
    startIndex = 0,
    endIndex = 0;
  for (let i = 0; i < sortedArray.length; i++) {
    startIndex = 0;
    let currentNumber = sortedArray[i];
    if (i > 0 && sortedArray[i] === sortedArray[i - 1]) {
      startIndex = endIndex + 1;
    }
    endIndex = subsets.length - 1;
    for (let j = startIndex; j < endIndex + 1; j++) {
      let set = subsets[j].slice(0);
      set.push(currentNumber);
      subsets.push(set);
    }
  }
  return subsets;
}
function allPermutations(array) {
  var permutations = [[]],
    result = [];
  for (let i = 0; i < array.length; i++) {
    let currentNumber = array[i],
      permutationLength = permutations.length;

    for (let j = 0; j < permutationLength; j++) {
      let oldPermutation = permutations.shift();
      for (let k = 0; k < oldPermutation.length + 1; k++) {
        let newPermutation = oldPermutation.slice(0);
        newPermutation.splice(k, 0, currentNumber);
        if (newPermutation.length === array.length) {
          result.push(newPermutation);
        } else {
          permutations.push(newPermutation);
        }
      }
    }
  }
  return result;
}
function binarySearchOf(array, value) {
  if (array.length <= 0) return -1;
  let start = 0,
    end = array.length - 1,
    isAscending = array[start] < array[end];
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (value === array[middle]) return middle;
    if (isAscending) {
      if (value < array[middle]) end = middle - 1;
      else start = middle + 1;
    } else {
      if (value < array[middle]) start = middle + 1;
      else end = middle - 1;
    }
  }
  return -1;
}
function binarySearch(array, value, { onExitLoop, onFoundValue }) {
  var start = 0,
    end = array.length - 1;
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (value === array[middle]) return onFoundValue(middle);
    if (value < array[middle]) {
      end = middle - 1;
    } else start = middle + 1;
  }
  return onExitLoop(start);
}
var resultHandler = (val) => val;
function ceilingIndexOf(array, value) {
  var end = array.length - 1;
  if (array.length <= 0 || value > array[end]) return -1;
  return binarySearch(array, value, {
    onExitLoop: resultHandler,
    onFoundValue: resultHandler,
  });
}
function smallestLetterGreaterThan(array, value) {
  var start = 0,
    end = array.length - 1;
  if (value >= array[end]) return array[start];
  return binarySearch(array, value, {
    onExitLoop: (val) => array[val],
    onFoundValue: (val) => array[val + 1],
  });
}
function rangeOf(array, value) {
  var start = 0,
    end = array.length - 1;
  let index = binarySearch(array, value, {
    onExitLoop: (_) => -1,
    onFoundValue: resultHandler,
  });
  if (index === -1) return [-1, -1];
  start = index;
  end = index;
  while (start - 1 >= 0 && array[start] === array[start - 1]) start = start - 1;
  while (end + 1 < array.length && array[end] === array[end + 1]) end = end + 1;
  return [start, end];
}
function searchIndexOf(array, value) {
  var start = 0,
    end = 1,
    arrayReader = buildArrayReader(array);
  if (arrayReader.getIndex(0) === Number.MAX_SAFE_INTEGER) return -1;
  while (arrayReader.getIndex(end) < value) {
    let newStart = end + 1;
    end += (end - start + 1) * 2;
    start = newStart;
  }
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (arrayReader.getIndex(middle) === value) return middle;
    if (arrayReader.getIndex(middle) > value) end = middle - 1;
    else start = middle + 1;
  }
  return -1;
}
function minimumDifferenceWith(array, value) {
  if (array.length <= 0) return null;
  var start = 0,
    end = array.length - 1;
  if (value < array[start]) return array[start];
  if (value > array[end]) return array[end];
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    if (array[middle] === value) return value;
    if (value < array[middle]) end = middle - 1;
    else start = middle + 1;
  }
  if (array[start] - value < value - array[end]) {
    return array[start];
  } else return array[end];
}
function bitonicArrayMaximum(array) {
  var start = 0,
    end = array.length - 1;
  while (start < end) {
    let middle = Math.floor((end + start) / 2);
    if (array[middle] > array[middle + 1]) end = middle;
    else start = middle + 1;
  }
  return array[start];
}
function bitonicArrayIndexOf(array, value) {
  var start = 0,
    end = array.length - 1;
  while (start < end) {
    let middle = Math.floor((end + start) / 2);
    if (array[middle] > array[middle + 1]) end = middle;
    else start = middle + 1;
  }
  let positionInLeftSide = binarySearchOf(array.slice(0, start + 1), value),
    positionInRightSide = binarySearchOf(array.slice(start + 1), value);
  if (positionInLeftSide !== -1) return positionInLeftSide;
  else if (positionInRightSide !== -1) return start + 1 + positionInRightSide;
  return -1;
}
function rotatedArrayIndexOf(array, value) {
  var start = 0,
    end = array.length - 1;
  while (start <= end) {
    let middle = Math.floor((end + start) / 2);
    if (array[middle] === value) return middle;
    if (array[start] <= array[middle]) {
      if (value >= array[start] && value < array[middle]) end = middle - 1;
      else start = middle + 1;
    } else {
      if (array[middle] < value && value <= array[end]) start = middle + 1;
      else end = middle - 1;
    }
  }
  return -1;
}
function rotatedArrayRotationCount(array) {
  var start = 0,
    end = array.length - 1;
  while (array[start] > array[end]) {
    let middle = Math.floor((end + start) / 2);
    if (array[start] > array[middle]) end = middle;
    else start = middle + 1;
  }
  return start;
}
function findSingleNumber(array) {
  if (array.length <= 0) return null;
  var number = array[0];
  for (let i = 1; i <= array.length; i++) {
    number ^= array[i];
  }
  return number;
}
function findTwoSingleNumbers(array) {
  if (array.length <= 0) return [];
  let number = findSingleNumber(array),
    rightMostDifferingBit = 1;
  while ((rightMostDifferingBit & number) === 0) {
    rightMostDifferingBit <<= 1;
  }
  let number1 = 0,
    number2 = 0;
  array.forEach((val) => {
    if ((val & rightMostDifferingBit) === 0) number1 ^= val;
    else number2 ^= val;
  });
  return [number1, number2];
}
function flipInvert(array) {
  var clonedArray = [...array],
    size = array.length;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < Math.floor((size + 1) / 2); col++) {
      let tmp = clonedArray[row][col] ^ 1;
      clonedArray[row][col] = clonedArray[row][size - 1 - col] ^ 1;
      clonedArray[row][size - 1 - col] = tmp;
    }
  }
  return clonedArray;
}
function kGreatestNumbers(array, k) {
  var heap = buildHeap([], (a, b) => a < b);
  for (let i = 0; i < k; i++) {
    heap.push(array[i]);
  }
  for (let i = k; i < array.length; i++) {
    if (array[i] > heap.peek()) {
      heap.pop();
      heap.push(array[i]);
    }
  }
  return heap.value().sort((a, b) => b - a);
}
function kSmallestNumber(array, k) {
  var heap = buildHeap([], (a, b) => a > b);
  for (let i = 0; i < k; i++) {
    heap.push(array[i]);
  }
  for (let i = k; i < array.length; i++) {
    if (array[i] < heap.peek()) {
      heap.pop();
      heap.push(array[i]);
    }
  }
  return heap.peek();
}
function euclideanDistance(point) {
  return Math.sqrt(point[0] ** 2 + point[1] ** 2);
}
function kClosestPointsToOrigin(array, k) {
  var heap = buildHeap(
    [],
    (a, b) => euclideanDistance(a) > euclideanDistance(b)
  );
  for (let i = 0; i < k; i++) {
    heap.push(array[i]);
  }
  for (let i = k; i < array.length; i++) {
    if (euclideanDistance(array[i]) < euclideanDistance(heap.peek())) {
      heap.pop();
      heap.push(array[i]);
    }
  }
  return heap
    .value()
    .sort((a, b) => euclideanDistance(a) - euclideanDistance(b));
}
function minimumRopesJoiningCost(array) {
  var heap = buildHeap([...array], (a, b) => a < b),
    minCost = 0;
  while (heap.length() > 0) {
    let value1 = heap.pop() ?? 0,
      value2 = heap.pop() ?? 0;
    minCost += value1 + value2;
    if (heap.length() > 0) {
      heap.push(value1 + value2);
    }
  }
  return minCost;
}
function kMostFrequentNumbers(array, k) {
  var frequencies = {},
    frequencyOccurrence = buildHeap([], (a, b) => a[1] < b[1]),
    result = [];
  for (let i = 0; i < array.length; i++) {
    frequencies.incrementKeyValue(array[i]);
  }
  Object.keys(frequencies).forEach((key) => {
    if (frequencyOccurrence.length() < k) {
      frequencyOccurrence.push([Number.parseInt(key), frequencies[key]]);
    } else {
      if (frequencies[key] > frequencyOccurrence.peek()[1]) {
        frequencyOccurrence.pop();
        frequencyOccurrence.push([Number.parseInt(key), frequencies[key]]);
      }
    }
  });
  while (frequencyOccurrence.length() > 0) {
    result.unshift(frequencyOccurrence.pop()[0]);
  }
  return result;
}
function kClosestNumbersTo(array, k, value) {
  var minHeap = buildHeap([], (a, b) => a[1] < b[1]),
    valueIndex = positionInSortedArray(array, value, (a, b) =>
      a < b ? -1 : 1
    ),
    result = [];
  let low = Math.max(valueIndex - k, 0),
    high = Math.min(valueIndex + k, array.length - 1);
  for (let i = low; i < high + 1; i++)
    minHeap.push([array[i], Math.abs(array[i] - value)]);

  for (let i = 0; i < k; i++) {
    result.push(minHeap.pop()[0]);
  }
  return result.sort();
}
function maxDistinctNumbersAfterKWithdrawals(array, k) {
  var minHeap = buildHeap([], (a, b) => a[1] < b[1]),
    result = 0,
    frequencies = {};
  array.forEach((element) => frequencies.incrementKeyValue(element));
  Object.keys(frequencies).forEach((key) => {
    let number = Number.parseInt(key);
    if (frequencies[key] === 1) {
      result++;
    } else if (frequencies[key] > 1) {
      if (minHeap.length() < k) minHeap.push([number, frequencies[key]]);
    }
  });
  while (k > 0 && minHeap.length() > 0) {
    let [number, frequency] = minHeap.pop();
    if (frequency === 2) result++;
    else minHeap.push([number, frequency - 1]);
    k--;
  }
  if (k > 0) result -= k;
  return result;
}
function sumOfElementsBetweenK1AndK2SmallestElements(array, k1, k2) {
  var maxHeap = buildHeap([], (a, b) => a > b),
    result = 0;
  array.forEach((value) => {
    if (maxHeap.length() < k2 - 1) {
      maxHeap.push(value);
    } else {
      if (value < maxHeap.peek()) {
        maxHeap.pop();
        maxHeap.push(value);
      }
    }
  });
  while (maxHeap.length() > k1) result += maxHeap.pop();
  return result;
}
function minimumCpuIntervalsWhenCoolingInKIntervals(array, k) {
  var maxHeap = buildHeap([], (a, b) => a[1] > b[1]),
    frequencies = {},
    result = 0;
  array.forEach((value) => frequencies.incrementKeyValue(value));
  Object.keys(frequencies).forEach((key) =>
    maxHeap.push([key, frequencies[key]])
  );
  while (maxHeap.length() > 0) {
    let n = k + 1,
      waitingList = [];
    while (n > 0 && maxHeap.length() > 0) {
      let [task, duration] = maxHeap.pop();
      if (duration > 1) waitingList.push([task, duration - 1]);
      result++;
      n--;
    }
    waitingList.forEach((value) => maxHeap.push(value));
    if (maxHeap.length() > 0) result += n;
  }
  return result;
}
function kSmallestValueOfSortedArrays(arrays, k) {
  var minHeap = buildHeap([], (a, b) => a[0] < b[0]),
    allElements = 0;
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      minHeap.push([arrays[i][0], i, 0]);
    }
    allElements += arrays[i].length;
  }
  let count = 0;
  if (allElements < k) return null;
  while (minHeap.length() > 0) {
    let [value, arrayIndex, valueIndex] = minHeap.pop();
    valueIndex++;
    count++;
    if (arrays[arrayIndex].length > valueIndex) {
      minHeap.push([arrays[arrayIndex][valueIndex], arrayIndex, valueIndex]);
    }
    if (count === k) return value;
  }
}
function kthSmallestElementInSortedMatrix(matrix, k) {
  var rows = matrix.length,
    start = matrix[0][0],
    end = matrix[rows - 1][rows - 1],
    allElements = 0;
  matrix.forEach((row) => (allElements += row.length));
  if (k < 1 || k > allElements) return null;
  while (start < end) {
    let middle = Math.floor(start + (end - start) / 2),
      [count, smaller, larger] = countElementLesserOrEqual(
        matrix,
        middle,
        matrix[0][0],
        matrix[rows - 1][rows - 1]
      );
    if (count === k) return smaller;
    if (count < k) start = larger;
    else end = smaller;
  }
  return start;
}
function countElementLesserOrEqual(matrix, middle, smaller, larger) {
  var count = 0,
    rows = matrix.length;
  let row = rows - 1,
    col = 0;
  while (row >= 0 && col < rows) {
    if (matrix[row][col] > middle) {
      larger = Math.min(larger, matrix[row][col]);
      row -= 1;
    } else {
      smaller = Math.max(smaller, matrix[row][col]);
      count += row + 1;
      col += 1;
    }
  }
  return [count, smaller, larger];
}
function findRangeContainingAtLeastOneNumberOfEachArrays(matrix) {
  var minHeap = buildHeap([], (a, b) => a[0] < b[0]),
    currentMax = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].length > 0) {
      currentMax = Math.max(currentMax, matrix[i][0]);
      minHeap.push([matrix[i][0], i, 0]);
    }
  }
  let lowerBound = Number.NEGATIVE_INFINITY,
    upperBound = Number.POSITIVE_INFINITY;
  while (minHeap.length() >= matrix.length) {
    let [value, arrayIndex, valueIndex] = minHeap.pop();
    valueIndex += 1;
    if (currentMax - value < upperBound - lowerBound) {
      lowerBound = value;
      upperBound = currentMax;
    }
    if (valueIndex < matrix[arrayIndex].length) {
      minHeap.push([matrix[arrayIndex][valueIndex], arrayIndex, valueIndex]);
      currentMax = Math.max(currentMax, matrix[arrayIndex][valueIndex]);
    }
  }
  return [lowerBound, upperBound];
}
function kLargestSumPairsWith(array1, array2, k) {
  var minHeap = buildHeap([], (a, b) => a[0] + a[1] < b[0] + b[1]);
  for (let i = 0; i < k && i < array1.length; i++) {
    for (let j = 0; j < k && j < array2.length; j++) {
      if (minHeap.length() < k) {
        minHeap.push([array1[i], array2[j]]);
      } else {
        let [value1, value2] = minHeap.peek();
        if (value1 + value2 < array1[i] + array2[j]) {
          minHeap.pop();
          minHeap.push([array1[i], array2[j]]);
        } else {
          return minHeap.value();
        }
      }
    }
  }
}
function smallestElement(array, position) {
  return recursiveSmallestElement(array, position, 0, array.length - 1);
}
function recursiveSmallestElement(array, position, low, high) {
  let pivot = partition(array, low, high);
  if (pivot === position - 1) return array[pivot];
  if (pivot > position - 1)
    return recursiveSmallestElement(array, position, low, pivot - 1);
  return recursiveSmallestElement(array, position, pivot + 1, high);
}
function partition(list, low, high) {
  if (low === high) return low;
  let median = medianOfMedians(list, low, high);
  for (let i = low; i < high; i++) {
    if (list[i] === median) {
      [list[i], list[high]] = [list[high], list[i]];
      break;
    }
  }
  const pivot = list[high];
  for (let i = low; i < high; i++) {
    if (list[i] < pivot) {
      [list[low], list[i]] = [list[i], list[low]];
      low += 1;
    }
  }
  [list[low], list[high]] = [list[high], list[low]];
  return low;
}
function medianOfMedians(list, low, high) {
  let elements = high - low + 1;
  if (elements < 5) return list[low];
  const partitions = [];
  for (let i = 0; i < list.length; i += 5) {
    if (i + 5 <= list.length) partitions.push(list.slice(i, i + 5));
  }
  partitions.forEach((partition) => partition.sort((a, b) => a - b));
  const medians = [];
  for (let i = 0; i < partitions.length; i++) {
    medians.push(partitions[i][2]);
  }
  return partition(medians, 0, medians.length - 1);
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
Array.prototype.hasCycle = function () {
  return hasCycle(this);
};
Array.prototype.mergeOverlappingIntervals = function () {
  return mergeOverlappingIntervals(this);
};
Array.prototype.mergeOverlappingIntervalsAfterInsert = function (newInterval) {
  return mergeOverlappingIntervalsAfterInsert(this, newInterval);
};
Array.prototype.intersectionWithInterval = function (newInterval) {
  return intersectionWithInterval(this, newInterval);
};
Array.prototype.hasOverlappingIntervals = function () {
  return hasOverlappingIntervals(this);
};
Array.prototype.minimumRoomHoldingIntervals = function () {
  return minimumRoomHoldingIntervals(this);
};
Array.prototype.maximumCpuLoad = function () {
  return maximumCpuLoad(this);
};
Array.prototype.freeIntervals = function () {
  return freeIntervals(this);
};
Array.prototype.cyclicSort = function () {
  return cyclicSort(this);
};
Array.prototype.missingNumber = function () {
  return missingNumber(this);
};
Array.prototype.allMissingNumbers = function () {
  return allMissingNumbers(this);
};
Array.prototype.duplicatedNumber = function () {
  return duplicatedNumber(this);
};
Array.prototype.findCorruptPair = function () {
  return findCorruptPair(this);
};
Array.prototype.firstKPositiveMissingNumbers = function (k) {
  return firstKPositiveMissingNumbers(this, k);
};
Array.prototype.nextIntervalIndices = function () {
  return nextIntervalIndices(this);
};
Array.prototype.allSubsets = function () {
  return allSubsets(this);
};
Array.prototype.allPermutations = function () {
  return allPermutations(this);
};
Array.prototype.binarySearchOf = function (value) {
  return binarySearchOf(this, value);
};
Array.prototype.ceilingIndexOf = function (value) {
  return ceilingIndexOf(this, value);
};
Array.prototype.smallestLetterGreaterThan = function (letter) {
  return smallestLetterGreaterThan(this, letter);
};
Array.prototype.rangeOf = function (value) {
  return rangeOf(this, value);
};
Array.prototype.searchIndexOf = function (value) {
  return searchIndexOf(this, value);
};
Array.prototype.minimumDifferenceWith = function (value) {
  return minimumDifferenceWith(this, value);
};
Array.prototype.bitonicArrayMaximum = function () {
  return bitonicArrayMaximum(this);
};
Array.prototype.bitonicArrayIndexOf = function (value) {
  return bitonicArrayIndexOf(this, value);
};
Array.prototype.rotatedArrayIndexOf = function (value) {
  return rotatedArrayIndexOf(this, value);
};
Array.prototype.rotatedArrayRotationCount = function () {
  return rotatedArrayRotationCount(this);
};
Array.prototype.findSingleNumber = function () {
  return findSingleNumber(this);
};
Array.prototype.findTwoSingleNumbers = function () {
  return findTwoSingleNumbers(this);
};
Array.prototype.flipInvert = function () {
  return flipInvert(this);
};
Array.prototype.kGreatestNumbers = function (k) {
  return kGreatestNumbers(this, k);
};
Array.prototype.kSmallestNumber = function (k) {
  return kSmallestNumber(this, k);
};
Array.prototype.kClosestPointsToOrigin = function (k) {
  return kClosestPointsToOrigin(this, k);
};
Array.prototype.minimumRopesJoiningCost = function () {
  return minimumRopesJoiningCost(this);
};
Array.prototype.kMostFrequentNumbers = function (k) {
  return kMostFrequentNumbers(this, k);
};
Array.prototype.kClosestNumbersTo = function (k, value) {
  return kClosestNumbersTo(this, k, value);
};
Array.prototype.maxDistinctNumbersAfterKWithdrawals = function (k) {
  return maxDistinctNumbersAfterKWithdrawals(this, k);
};
Array.prototype.sumOfElementsBetweenK1AndK2SmallestElements = function (
  k1,
  k2
) {
  return sumOfElementsBetweenK1AndK2SmallestElements(this, k1, k2);
};
Array.prototype.minimumCpuIntervalsWhenCoolingInKIntervals = function (k) {
  return minimumCpuIntervalsWhenCoolingInKIntervals(this, k);
};
Array.prototype.kSmallestValueOfSortedArrays = function (k) {
  return kSmallestValueOfSortedArrays(this, k);
};
Array.prototype.findRangeContainingAtLeastOneNumberOfEachArrays = function () {
  return findRangeContainingAtLeastOneNumberOfEachArrays(this);
};
Array.prototype.kLargestSumPairsWith = function (array, k) {
  return kLargestSumPairsWith(this, array, k);
};
Array.prototype.smallestElement = function (k) {
  return smallestElement(this, k);
};
module.exports = {
  kthSmallestElementInSortedMatrix,
};
