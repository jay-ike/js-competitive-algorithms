/*jslint
 node,  this, bitwise
 */
"use strict";
const {
    buildArrayReader,
    buildHeap,
    interval,
    job,
    positionInSortedArray
} = require("../utils");
var resultHandler = (val) => val;
var defaultComparator = function (array) {
    return function (index, iterator) {
        return array[index] !== array[iterator];
    };
};
function maximumArraySum(array, size) {
    var endIndex = 0;
    var startIndex = 0;
    var sum = 0;
    var currentMaxSum = Number.NEGATIVE_INFINITY;
    while (endIndex < array.length) {
        sum += array[endIndex];
        endIndex += 1;
        if (endIndex - startIndex >= size - 1) {
            currentMaxSum = Math.max(sum, currentMaxSum);
            sum -= array[startIndex];
        }
    }
    if (currentMaxSum === Number.NEGATIVE_INFINITY || size < 1) {
        throw new RangeError(`cannot have a subarray of size ${size}`);
    }
    return currentMaxSum;
}
function totalElementsInBucket(bucket) {
    return Object.keys(bucket).reduce(
        (
            previousValue,
            currentValue
        ) => previousValue + bucket[currentValue],
        0
    );
}
function maxElementsInBaskets(array, baskets) {
    var bucket = {};
    var maxElements = 0;
    var startIndex = 0;
    var endIndex = 0;
    while (endIndex <= array.length) {
        if (
            Object.keys(bucket).length < baskets ||
            !Object.isNull(bucket[array[endIndex]])
        ) {
            bucket.incrementKeyValue(array[endIndex]);
            endIndex += 1;
        } else {
            maxElements = Math.max(totalElementsInBucket(bucket), maxElements);
            while (Object.keys(bucket).length >= baskets) {
                bucket.decrementKeyValue(array[startIndex]);
                startIndex += 1;
            }
        }
    }
    return maxElements;
}

function longestSubArrayAfterReplacement(array, replacements) {
    var startIndex = 0;
    var endIndex = 0;
    var result = Number.NEGATIVE_INFINITY;
    var toBeReplaced = 0;
    while (endIndex < array.length) {
        if (toBeReplaced < replacements || array[endIndex] === 1) {
            toBeReplaced += (
                array[endIndex] === 0
                ? 1
                : 0
            );
            endIndex += 1;
        } else {
            while (toBeReplaced >= replacements) {
                toBeReplaced -= (
                    array[startIndex] === 0
                    ? 1
                    : 0
                );
                startIndex += 1;
            }
        }
        result = Math.max(result, endIndex - startIndex);
    }
    return result;
}
function noDuplicateLength(array) {
    var startIndex = 0;
    var endIndex = 1;
    var result = 0;
    if ((array?.length ?? 0) === 0) {
        return result;
    }
    result = 1;
    while (endIndex < array.length) {
        if (array[endIndex] !== array[startIndex]) {
            result += 1;
            startIndex = endIndex;
        }
        endIndex += 1;
    }
    return result;
}

function indicesWithSum(array, sum) {
    var numbersDictionary = {};
    var endIndex = 0;
    var currentNumber;
    var result = [];
    if (
        (array?.length ?? 0) === 0
    ) {
        return [];
    }
    while (endIndex < array.length) {
        currentNumber = array[endIndex];
        if (!Object.isNull(numbersDictionary[sum - currentNumber])) {
            result.push(numbersDictionary[sum - currentNumber], endIndex);
        }
        numbersDictionary[array[endIndex]] = endIndex;
        endIndex += 1;
    }
    return result;
}
function rotateArray(arr, pivot) {
    var modulusPivot = 0;
    if (pivot > 0) {
        modulusPivot = pivot % arr.length;
    }
    if (pivot < 0) {
        modulusPivot = arr.length + (pivot % arr.length);
    }
    return [...arr.slice(modulusPivot), ...arr.slice(0, modulusPivot)];
}
function sortedSquares(array) {
    var endIndex = array.length - 1;
    var startIndex = 0;
    var result = [];
    while (endIndex >= startIndex) {
        if (Math.pow(array[endIndex], 2) >= Math.pow(array[startIndex], 2)) {
            result.push(Math.pow(array[endIndex], 2));
            endIndex -= 1;
        } else {
            result.push(Math.pow(array[startIndex], 2));
            startIndex += 1;
        }
    }
    return result.reverse();
}
function tripletsWhichSumIsZero(array) {
    var sortedArray = [...array];
    var triplets = [];
    var index = 0;
    sortedArray = sortedArray.sort((a, b) => a - b);
    while (index < sortedArray.length) {
        if (
            index <= 0 || sortedArray[index] !== sortedArray[index + 1]
        ) {
            searchPairSum(
                sortedArray,
                index + 1,
                -sortedArray[index],
                triplets
            );
        }
        index += 1;
    }
    return triplets;
}

function searchPairSum(array, startIndex, targetSum, currentTriplets) {
    var endIndex = array.length - 1;
    var currentSum;
    while (endIndex > startIndex) {
        currentSum = array[startIndex] + array[endIndex];
        if (currentSum === targetSum) {
            currentTriplets.push([
                -targetSum,
                array[startIndex],
                array[endIndex]
            ]);
            endIndex -= 1;
            startIndex += 1;
            while (array[startIndex] === array[startIndex - 1]) {
                startIndex += 1;
            }
            while (array[endIndex] === array[endIndex + 1]) {
                endIndex -= 1;
            }
        } else if (currentSum > targetSum) {
            endIndex -= 1;
        } else {
            startIndex += 1;
        }
    }
}
function smallestTripletSumCloseTo(array, target) {
    var sortedArray = [...array];
    var sum = Number.NEGATIVE_INFINITY;
    var endIndex;
    var startIndex;
    var currentSum;
    var index = 0;
    sortedArray = sortedArray.sort((a, b) => a - b);
    while (index < sortedArray.length) {
        endIndex = sortedArray.length - 1;
        startIndex = index + 1;
        while (endIndex > startIndex) {
            currentSum =
            sortedArray[index] +
            sortedArray[startIndex] +
            sortedArray[endIndex];
            if (currentSum > target) {
                endIndex -= 1;
            } else {
                sum = Math.max(sum, currentSum);
                startIndex += 1;
            }
        }
        index += 1;
    }
    return sum;
}
function tripletsSumSmallerThan(array, targetSum) {
    var sortedArray = [...array];
    var triplets = [];
    var startIndex;
    var endIndex;
    var currentSum;
    var endMarker;
    var index = 0;
    sortedArray = sortedArray.sort((a, b) => a - b);
    while (index < sortedArray.length) {
        endIndex = sortedArray.length - 1;
        startIndex = index + 1;
        while (endIndex > startIndex) {
            currentSum =
            sortedArray[index] +
            sortedArray[startIndex] +
            sortedArray[endIndex];
            if (currentSum >= targetSum) {
                endIndex -= 1;
            } else {
                endMarker = endIndex;
                while (endMarker > startIndex) {
                    triplets.push([
                        sortedArray[index],
                        sortedArray[startIndex],
                        sortedArray[endMarker]
                    ]);
                    endMarker -= 1;
                }
                startIndex += 1;
            }
        }
        index += 1;
    }
    return triplets;
}
function subArraysProductLessThan(array, target) {
    var result = [];
    var subArray;
    var currentProduct;
    var endIndex;
    var index = 0;
    while (index < array.length) {
        subArray = [];
        currentProduct = array[index];
        endIndex = index;
        while (currentProduct < target) {
            subArray.push(array[endIndex]);
            result.push([...subArray]);
            endIndex += 1;
            currentProduct *= array[endIndex];
        }
        index += 1;
    }
    return result;
}
function sortInPlace(array) {
    var low = 0;
    var index = 0;
    var high = array.length - 1;
    while (index <= high) {
        if (array[index] === 0) {
            [array[low], array[index]] = [array[index], array[low]];
            index += 1;
            low += 1;
        } else if (array[index] === 1) {
            index += 1;
        } else {
            [array[high], array[index]] = [array[index], array[high]];
            high -= 1;
        }
    }
    return array;
}
function quadrupletsWithSum(array, target) {
    var sortedArray = [...array];
    var result = [];
    var startIndex;
    var endIndex;
    var currentSum;
    var first = 0;
    var second;
    sortedArray = sortedArray.sort((a, b) => a - b);
    while (first <= sortedArray.length - 4) {
        second = first + 1;
        while (second <= sortedArray.length - 3) {
            startIndex = second + 1;
            endIndex = sortedArray.length - 1;
            while (startIndex < endIndex) {
                currentSum =
                sortedArray[first] +
                sortedArray[second] +
                sortedArray[startIndex] +
                sortedArray[endIndex];
                if (target === currentSum) {
                    result.push([
                        sortedArray[first],
                        sortedArray[second],
                        sortedArray[startIndex],
                        sortedArray[endIndex]
                    ]);
                    startIndex += 1;
                    endIndex -= 1;
                    while (
                        sortedArray[startIndex] ===
                        sortedArray[startIndex - 1]
                    ) {
                        startIndex += 1;
                    }
                    while (
                        sortedArray[endIndex] ===
                        sortedArray[endIndex + 1]
                    ) {
                        endIndex -= 1;
                    }
                } else if (currentSum < target) {
                    startIndex += 1;
                } else {
                    endIndex -= 1;
                }
            }
            second += 1;
        }
        first += 1;
    }
    return result;
}
function minimumArrayToBeSorted(array) {
    var startIndex = 0;
    var endIndex = array.length - 1;
    var clonedArray = [...array];
    while (
        clonedArray[startIndex] <= clonedArray[startIndex + 1] ||
        clonedArray[endIndex] >= clonedArray[endIndex - 1]
    ) {
        if (clonedArray[startIndex] <= clonedArray[startIndex + 1]) {
            startIndex += 1;
        }
        if (clonedArray[endIndex] >= clonedArray[endIndex - 1]) {
            endIndex -= 1;
        }
        if (endIndex <= startIndex) {
            return [];
        }
    }

    startIndex = indexBiggerThan(
        clonedArray,
        startIndex,
        Math.min(clonedArray[startIndex], clonedArray[endIndex])
    ) ?? startIndex;
    endIndex = indexSmallerThan(
        clonedArray,
        endIndex,
        Math.max(
            clonedArray[startIndex],
            clonedArray[endIndex]
        )
    ) ?? endIndex;
    return clonedArray.slice(startIndex, endIndex + 1);
}
function indexSmallerThan(array, begin, value) {
    var index = array.length - 1;
    while (index >= begin) {
        if (array[index] < value) {
            return index;
        }
        index -= 1;
    }
}
function indexBiggerThan(array, end, value) {
    var index = 0;
    while (index < end) {
        if (array[index] > value) {
            return index;
        }
        index += 1;
    }
}
function hasCycle(array) {
    var isForward;
    var fast;
    var slow;
    var index = 0;
    while (index < array.length) {
        isForward = array[index] >= 0;
        fast = index;
        slow = index;
        while (true) {
            slow = nextIndex(array, isForward, slow);
            fast = nextIndex(array, isForward, fast);
            if (fast !== -1) {
                fast = nextIndex(array, isForward, fast);
            }
            if (
                slow === -1 ||
                fast === -1 ||
                fast === slow
            ) {
                break;
            }
        }
        if (slow !== -1 && fast === slow) {
            return true;
        }
        index += 1;
    }
    return false;
}
function nextIndex(array, isForward, currentIndex) {
    var direction = array[currentIndex] >= 0;
    var nextPosition;
    if (isForward !== direction) {
        return -1;
    }
    nextPosition = (
        currentIndex + array[currentIndex]
    ) % array.length;
    if (nextPosition < 0) {
        nextPosition += array.length;
    }
    if (nextPosition === currentIndex) {
        return -1;
    }
    return nextPosition;
}
function mergeOverlappingIntervals(intervals) {
    var result = [];
    var sortedIntervals = intervals.map(
        interval
    ).sort((a, b) => a.begin - b.begin);
    var start = sortedIntervals[0].begin;
    var end = sortedIntervals[0].end;
    var currentInterval;
    var index = 1;
    while (index < sortedIntervals.length) {
        currentInterval = sortedIntervals[index];
        if (currentInterval.begin <= end) {
            end = Math.max(currentInterval.end, end);
        } else {
            result.push([start, end]);
            start = currentInterval.begin;
            end = currentInterval.end;
        }
        index += 1;
    }
    result.push([start, end]);
    return result;
}
function hasOverlappingIntervals(intervals) {
    var sortedIntervals = [...intervals].map(
        interval
    ).sort((a, b) => a.begin - b.begin);
    var index = 1;
    while (index < sortedIntervals.length) {
        if (
            sortedIntervals[index].begin < sortedIntervals[index - 1].end
        ) {
            return true;
        }
        index += 1;
    }
    return false;
}
function minimumRoomHoldingIntervals(intervals) {
    var minimumRoom = 0;
    var sortedIntervals = [...intervals].map(
        interval
    ).sort((a, b) => a.begin - b.begin);
    var heap = buildHeap([], (a, b) => a.end < b.end);
    var begin;
    var index = 0;
    while (index < sortedIntervals.length) {
        begin = sortedIntervals[index].begin;
        while (heap.length() > 0 && begin >= heap.peek().end) {
            heap.pop();
        }
        heap.push(sortedIntervals[index]);
        minimumRoom = Math.max(heap.length(), minimumRoom);
        index += 1;
    }
    return minimumRoom;
}

function maximumCpuLoad(jobs) {
    var maxLoad = 0;
    var currentLoad = 0;
    var sortedJobs = [...jobs].map(job).sort((a, b) => a.begin - b.begin);
    var heap = buildHeap([], (a, b) => a.end < b.end);
    var currentJob;
    var i = 0;
    while (i < sortedJobs.length) {
        currentJob = sortedJobs[i];
        while (
            heap.length() > 0 &&
            currentJob.begin >= heap.peek().end
        ) {
            currentLoad -= heap.pop().load;
        }
        heap.push(currentJob);
        currentLoad += currentJob.load;
        maxLoad = Math.max(maxLoad, currentLoad);
        i += 1;
    }
    return maxLoad;
}
function freeIntervals(schedules) {
    var employeeInterval = function (
        employeeInterval,
        employeeIndex,
        intervalIndex
    ) {
        return {
            employeeIndex,
            interval: interval(employeeInterval),
            intervalIndex
        };
    };
    var heap = buildHeap([], (a, b) => a.interval.begin < b.interval.begin);
    var result = [];
    var heapTop;
    var employeeSchedule;
    var previousInterval;
    Object.keys(schedules).forEach(function (key) {
        heap.push(employeeInterval(schedules[key][0], key, 0));
    });
    previousInterval = heap.peek().interval;
    while (heap.length() > 0) {
        heapTop = heap.pop();
        if (previousInterval.end < heapTop.interval.begin) {
            result.push([previousInterval.end, heapTop.interval.begin]);
            previousInterval = heapTop.interval;
        } else {
            if (previousInterval.end < heapTop.interval.end) {
                previousInterval = heapTop.interval;
            }
        }
        employeeSchedule = schedules[heapTop.employeeIndex];
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
    var nextPosition = 0;
    var result = [];
    var start;
    var end;
    var newStart;
    var newEnd;
    var index;
    while (
        nextPosition < intervals.length &&
        intervals[nextPosition][1] < newInterval[0]
    ) {
        start = intervals[nextPosition][0];
        end = intervals[nextPosition][1];
        result.push([start, end]);
        nextPosition += 1;
    }
    start = Math.min(newInterval[0], intervals[nextPosition][0]);
    end = Math.max(newInterval[1], intervals[nextPosition][1]);
    nextPosition += 1;
    index = nextPosition;
    while (index < intervals.length) {
        newStart = intervals[nextPosition][0];
        newEnd = intervals[nextPosition][1];
        if (newStart <= end) {
            end = Math.max(end, newEnd);
        } else {
            result.push([start, end]);
            start = newStart;
            end = newEnd;
        }
        index += 1;
    }
    result.push([start, end]);

    return result;
}
function intersectionWithInterval(intervals, otherIntervals) {
    var result = [];
    var firstIndex = 0;
    var secondIndex = 0;
    var firstOverlapSecond;
    var secondOverlapFirst;
    while (
        (firstIndex < intervals.length) &&
        (secondIndex < otherIntervals.length)
    ) {
        firstOverlapSecond = (
            (intervals[firstIndex][0] >= otherIntervals[secondIndex][0]) &&
            (intervals[firstIndex][0] <= otherIntervals[secondIndex][1])
        );
        secondOverlapFirst = (
            (otherIntervals[secondIndex][0] >= intervals[firstIndex][0]) &&
            (otherIntervals[secondIndex][0] <= intervals[firstIndex][1])
        );
        if (firstOverlapSecond || secondOverlapFirst) {
            result.push([
                Math.max(
                    intervals[firstIndex][0],
                    otherIntervals[secondIndex][0]
                ),
                Math.min(
                    intervals[firstIndex][1],
                    otherIntervals[secondIndex][1]
                )
            ]);
        }
        if (intervals[firstIndex][1] < otherIntervals[secondIndex][1]) {
            firstIndex += 1;
        } else {
            secondIndex += 1;
        }
    }
    return result;
}
function cyclicSort(array) {
    var index = 0;
    var comparator = defaultComparator(array);
    cyclicSwap(index, array, (index) => array[index] - 1, comparator);
}
function missingNumber(array) {
    var index = 0;
    var n = array.length;
    var comparator = (index, iterator) => (
        (array[index] < n)
        && (array[index] !== array[iterator])
    );
    index = 0;
    cyclicSwap(index, array, (index) => array[index], comparator);
    while (index < array.length) {
        if (array[index] !== index) {
            return index;
        }
        index += 1;
    }
    return n;
}
/**
 *
 * @param {Array} array
 * @returns Array<Number>
 * @description find all missing numbers in an array ranged from 1 to n
 *
 */
function allMissingNumbers(array) {
    var result = [];
    var index = 0;
    var comparator = defaultComparator(array);
    cyclicSwap(index, array, (index) => array[index] - 1, comparator);
    while (index < array.length) {
        if (array[index] !== index + 1) {
            result.push(index + 1);
        }
        index += 1;
    }
    return result;
}
function cyclicSwap(index, array, iterator, comparator) {
    var j;
    while (index < array.length) {
        j = iterator(index);
        if (comparator(index, j)) {
            [array[index], array[j]] = [array[j], array[index]];
        } else {
            index += 1;
        }
    }
    return index;
}

function duplicatedNumber(array) {
    var index = 0;
    var j;
    while (index < array.length) {
        if (array[index] !== index + 1) {
            j = array[index] - 1;
            if (array[index] !== array[j]) {
                [array[index], array[j]] = [array[j], array[index]];
            } else {
                return array[index];
            }
        } else {
            index += 1;
        }
    }
    return -1;
}
function findCorruptPair(array) {
    var index = 0;
    var result = [];
    var comparator = defaultComparator(array);
    cyclicSwap(index, array, (index) => array[index] - 1, comparator);
    while (index < array.length) {
        if (array[index] !== index + 1) {
            result = [array[index], index + 1];
        }
        index += 1;
    }
    return result;
}
function firstKPositiveMissingNumbers(array, k) {
    var index = 0;
    var totalSeen = 0;
    var extraNumbers = {};
    var result = [];
    var comparator = (index, iterator) => (
        (array[index] > 0)
        && (array[index] - 1 < array.length)
        && (array[index] !== array[iterator])
    );
    cyclicSwap(index, array, (index) => array[index] - 1, comparator);
    while (index < array.length) {
        if (array[index] !== index + 1 && totalSeen < k) {
            result.push(index + 1);
            totalSeen += 1;
        }
        if (array[index] >= array.length + 1) {
            extraNumbers[array[index]] = index;
        }
        index += 1;
    }
    while (totalSeen < k) {
        if (Object.isNull(extraNumbers[array.length + 1])) {
            result.push(array.length + 1);
            totalSeen += 1;
        }
        array.length += 1;
    }
    return result;
}
function nextIntervalIndices(intervals) {
    var maxStarts = buildHeap([], (a, b) => a[0] > b[0]);
    var maxEnds = buildHeap([], (a, b) => a[0] > b[0]);
    var result = [...intervals];
    var endDetails;
    var startDetails;
    result = result.fill(-1);
    intervals.forEach(function (elt, i) {
        maxStarts.push([elt[0], i]);
        maxEnds.push([elt[1], i]);
    });
    while (intervals.length) {
        endDetails = maxEnds.pop();
        if (maxStarts.peek()[0] >= endDetails[0]) {
            startDetails = maxStarts.pop();
            while (
                maxStarts.length() &&
                (maxStarts.peek()[0] >= endDetails[0])
            ) {
                startDetails = maxStarts.pop();
            }
            result[endDetails[1]] = startDetails[1];
            maxStarts.push(startDetails);
        }
        if (maxEnds.length() <= 0) {
            break;
        }
    }
    return result;
}
function allSubsets(array) {
    var subsets = [[]];
    var sortedArray = [...array];
    var startIndex = 0;
    var endIndex = 0;
    sortedArray = sortedArray.sort();
    sortedArray.forEach(function (value, i, arr) {
        var j;
        var set;
        startIndex = 0;
        if (i > 0 && value === arr[i - 1]) {
            startIndex = endIndex + 1;
        }
        endIndex = subsets.length - 1;
        j = startIndex;
        while (j < endIndex + 1) {
            set = subsets[j].slice(0);
            set.push(value);
            subsets.push(set);
            j += 1;
        }
    });
    return subsets;
}
function allPermutations(array) {
    var permutations = [[]];
    var result = [];
    array.forEach(function (value) {
        var oldPermutation;
        var newPermutation;
        var permutationLength = permutations.length;
        var j = 0;
        var k;
        while (j < permutationLength) {
            oldPermutation = permutations.shift();
            k = 0;
            while (k < oldPermutation.length + 1) {
                newPermutation = oldPermutation.slice(0);
                newPermutation.splice(k, 0, value);
                if (newPermutation.length === array.length) {
                    result.push(newPermutation);
                } else {
                    permutations.push(newPermutation);
                }
                k += 1;
            }
            j += 1;
        }
    });
    return result;
}
function binarySearch(start, end, value, indexReader, {
    onExitLoop,
    onFoundValue
}) {
    var middle;
    var isAscending = indexReader(start) < indexReader(end);
    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (value === indexReader(middle)) {
            return onFoundValue(middle);
        }
        if (isAscending) {
            if (value < indexReader(middle)) {
                end = middle - 1;
            } else {
                start = middle + 1;
            }
        } else {
            if (value < indexReader(middle)) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
    }
    return onExitLoop(start, end);
}
function dichotomicSearch(
    start,
    end,
    indexReader,
    onLoopExit
) {
    var middle;
    while (start < end) {
        middle = Math.floor((end + start) / 2);
        if (indexReader(middle) > indexReader(middle + 1)) {
            end = middle;
        } else {
            start = middle + 1;
        }
    }
    return onLoopExit(start, end);
}
function ceilingIndexOf(array, value) {
    if (
        (array.length <= 0) ||
        (value > array[array.length - 1])
    ) {
        return -1;
    }
    return binarySearch(
        0,
        array.length - 1,
        value,
        (index) => array[index],
        {
            onExitLoop: resultHandler,
            onFoundValue: resultHandler
        }
    );
}
function smallestLetterGreaterThan(array, value) {
    if (value >= array[array.length - 1]) {
        return array[0];
    }
    return binarySearch(
        0,
        array.length - 1,
        value,
        (index) => array[index],
        {
            onExitLoop: (val) => array[val],
            onFoundValue: (val) => array[val + 1]
        }
    );
}
function rangeOf(array, value) {
    var start = 0;
    var end = array.length - 1;
    var index = binarySearch(
        start,
        end,
        value,
        (index) => array[index],
        {
            onExitLoop: () => -1,
            onFoundValue: resultHandler
        }
    );
    if (index === -1) {
        return [-1, -1];
    }
    start = index;
    end = index;
    while (start - 1 >= 0 && array[start] === array[start - 1]) {
        start = start - 1;
    }
    while (end + 1 < array.length && array[end] === array[end + 1]) {
        end = end + 1;
    }
    return [start, end];
}
function searchIndexOf(array, value) {
    var start = 0;
    var end = 1;
    var arrayReader = buildArrayReader(array);
    var newStart;
    var middle;
    if (arrayReader.getIndex(0) === Number.MAX_SAFE_INTEGER) {
        return -1;
    }
    while (arrayReader.getIndex(end) < value) {
        newStart = end + 1;
        end += (end - start + 1) * 2;
        start = newStart;
    }
    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (arrayReader.getIndex(middle) === value) {
            return middle;
        }
        if (arrayReader.getIndex(middle) > value) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return binarySearch(
        start,
        end,
        value,
        arrayReader.getIndex,
        {
            onExitLoop: () => -1,
            onFoundValue: resultHandler
        }
    );
}
function minimumDifferenceWith(array, value) {
    var start;
    var end;
    if (array.length <= 0) {
        return null;
    }
    start = 0;
    end = array.length - 1;
    if (value < array[start]) {
        return array[start];
    }
    if (value > array[end]) {
        return array[end];
    }
    return binarySearch(
        start,
        end,
        value,
        (index) => array[index],
        {
            onExitLoop: function (start, end) {
                if (array[start] - value < value - array[end]) {
                    return array[start];
                } else {
                    return array[end];
                }
            },
            onFoundValue: (index) => array[index]
        }
    );
}
function bitonicArrayMaximum(array) {
    var start = 0;
    var end = array.length - 1;
    return dichotomicSearch(
        start,
        end,
        (index) => array[index],
        (start) => array[start]
    );
}
function bitonicArrayIndexOf(array, value) {
    var start = 0;
    var end = array.length - 1;
    return dichotomicSearch(
        start,
        end,
        (index) => array[index],
        function (start) {
            var leftPosition = binarySearch(
                0,
                start,
                value,
                (index) => array[index],
                {
                    onExitLoop: () => -1,
                    onFoundValue: resultHandler
                }
            );
            var rightPosition = binarySearch(
                start + 1,
                array.length - 1,
                value,
                (index) => array[index],
                {
                    onExitLoop: () => -1,
                    onFoundValue: resultHandler
                }
            );
            if (leftPosition !== -1) {
                return leftPosition;
            }
            if (rightPosition !== -1) {
                return rightPosition;
            }
            return -1;
        }
    );
}
function rotatedArrayIndexOf(array, value) {
    var middle;
    var start = 0;
    var end = array.length - 1;
    while (start <= end) {
        middle = Math.floor((end + start) / 2);
        if (array[middle] === value) {
            return middle;
        }
        if (array[start] <= array[middle]) {
            if (value >= array[start] && value < array[middle]) {
                end = middle - 1;
            } else {
                start = middle + 1;
            }
        } else {
            if (array[middle] < value && value <= array[end]) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
    }
    return -1;
}
function rotatedArrayRotationCount(array) {
    var start = 0;
    var end = array.length - 1;
    var middle;
    while (array[start] > array[end]) {
        middle = Math.floor((start + end) / 2);
        if (array[start] > array[middle]) {
            end = middle;
        } else {
            start = middle + 1;
        }
    }
    return start;
}
function findSingleNumber(array) {
    var number;
    var i = 1;
    if (array.length <= 0) {
        return null;
    }
    number = array[0];
    while (i <= array.length) {
        number = number ^ array[i];
        i += 1;
    }
    return number;
}
function findTwoSingleNumbers(array) {
    var number;
    var number2;
    var rightMostDifferingBit;
    if (array.length <= 0) {
        return [];
    }
    number = findSingleNumber(array);
    rightMostDifferingBit = 1;
    while ((rightMostDifferingBit & number) === 0) {
        rightMostDifferingBit = rightMostDifferingBit << 1;
    }
    number = 0;
    number2 = 0;
    array.forEach(function (val) {
        if ((val & rightMostDifferingBit) === 0) {
            number = number ^ val;
        } else {
            number2 = number2 ^ val;
        }
    });
    return [number, number2];
}
function flipInvert(array) {
    var clonedArray = [...array];
    var tmp;
    var i;
    array.forEach(function (val, row, arr) {
        i = 0;
        while (i < Math.floor((arr.length + 1) / 2)) {
            tmp = val[i] ^ 1;
            clonedArray[row][i] = (
                clonedArray[row][arr.length - 1 - i] ^ 1
            );
            clonedArray[row][arr.length - 1 - i] = tmp;
            i += 1;
        }
    });
    return clonedArray;
}
function kGreatestNumbers(array, k) {
    var heap = buildHeap([], (a, b) => a < b);
    var i = 0;
    while (i < k) {
        heap.push(array[i]);
        i += 1;
    }
    while (i < array.length) {
        if (array[i] > heap.peek()) {
            heap.pop();
            heap.push(array[i]);
        }
        i += 1;
    }
    return heap.value().sort((a, b) => b - a);
}
function euclideanDistance(point) {
    return Math.sqrt(point[0] ** 2 + point[1] ** 2);
}
function kClosestPointsToOrigin(array, k) {
    var heap = buildHeap(
        [],
        (a, b) => euclideanDistance(a) > euclideanDistance(b)
    );
    var i = 0;
    while (i < k) {
        heap.push(array[i]);
        i += 1;
    }
    while (i < array.length) {
        if (euclideanDistance(array[i]) < euclideanDistance(heap.peek())) {
            heap.pop();
            heap.push(array[i]);
        }
        i += 1;
    }
    return heap.value().sort(
        (a, b) => euclideanDistance(a) - euclideanDistance(b)
    );
}
function minimumRopesJoiningCost(array) {
    var heap = buildHeap([...array], (a, b) => a < b);
    var minCost = 0;
    var value1;
    var value2;
    while (heap.length() > 0) {
        value1 = heap.pop() ?? 0;
        value2 = heap.pop() ?? 0;
        minCost += value1 + value2;
        if (heap.length() > 0) {
            heap.push(value1 + value2);
        }
    }
    return minCost;
}
function kMostFrequentNumbers(array, k) {
    var frequencies = {};
    var frequencyOccurrence = buildHeap([], (a, b) => a[1] < b[1]);
    var result = [];
    array.forEach(function (key) {
        frequencies.incrementKeyValue(key);
    });
    Object.keys(frequencies).forEach(function (key) {
        if (frequencyOccurrence.length() < k) {
            frequencyOccurrence.push([Number.parseInt(key), frequencies[key]]);
        } else {
            if (frequencies[key] > frequencyOccurrence.peek()[1]) {
                frequencyOccurrence.pop();
                frequencyOccurrence.push([
                    Number.parseInt(key),
                    frequencies[key]
                ]);
            }
        }
    });
    while (frequencyOccurrence.length() > 0) {
        result.unshift(frequencyOccurrence.pop()[0]);
    }
    return result;
}
function kClosestNumbersTo(array, k, value) {
    var minHeap = buildHeap([], (a, b) => a[1] < b[1]);
    var valueIndex = positionInSortedArray(
        array,
        value,
        (a, b) => (
            a < b
            ? -1
            : 1
        )
    );
    var result = [];
    var low = Math.max(valueIndex - k, 0);
    var high = Math.min(valueIndex + k, array.length - 1);
    var i = low;
    while (i < high + 1) {
        minHeap.push([array[i], Math.abs(array[i] - value)]);
        i += 1;
    }
    i = 0;
    while (i < k) {
        result.push(minHeap.pop()[0]);
        i += 1;
    }
    return result.sort();
}
function maxDistinctNumbersAfterKWithdrawals(array, k) {
    var minHeap = buildHeap([], (a, b) => a[1] < b[1]);
    var result = 0;
    var frequencies = {};
    var numberDetails;
    array.forEach(function (key) {
        frequencies.incrementKeyValue(key);
    });
    Object.keys(frequencies).forEach(function (key) {
        var number = Number.parseInt(key);
        if (frequencies[key] === 1) {
            result += 1;
        } else if (frequencies[key] > 1) {
            if (minHeap.length() < k) {
                minHeap.push([number, frequencies[key]]);
            }
        }
    });
    while (k > 0 && minHeap.length() > 0) {
        numberDetails = minHeap.pop();
        if (numberDetails[1] === 2) {
            result += 1;
        } else {
            minHeap.push([numberDetails[0], numberDetails[1] - 1]);
        }
        k -= 1;
    }
    if (k > 0) {
        result -= k;
    }
    return result;
}
function sumOfElementsBetweenK1AndK2SmallestElements(
    array,
    k1,
    k2
) {
    var maxHeap = buildHeap([], (a, b) => a > b);
    var result = 0;
    array.forEach(function (value) {
        if (maxHeap.length() < k2 - 1) {
            maxHeap.push(value);
        } else {
            if (value < maxHeap.peek()) {
                maxHeap.pop();
                maxHeap.push(value);
            }
        }
    });
    while (maxHeap.length() > k1) {
        result += maxHeap.pop();
    }
    return result;
}
function minimumCpuIntervalsWhenCoolingInKIntervals(array, k) {
    var maxHeap = buildHeap([], (a, b) => a[1] > b[1]);
    var frequencies = {};
    var result = 0;
    var waitingList;
    var taskDetails;
    var n;
    array.forEach(function (key) {
        frequencies.incrementKeyValue(key);
    });
    Object.keys(frequencies).forEach(
        (key) => maxHeap.push([key, frequencies[key]])
    );
    while (maxHeap.length() > 0) {
        n = k + 1;
        waitingList = [];
        while (n > 0 && maxHeap.length() > 0) {
            taskDetails = maxHeap.pop();
            if (taskDetails[1] > 1) {
                waitingList.push([
                    taskDetails[0],
                    taskDetails[1] - 1
                ]);
            }
            result += 1;
            n -= 1;
        }
        waitingList.forEach(maxHeap.push);
        if (maxHeap.length() > 0) {
            result += n;
        }
    }
    return result;
}
function kSmallestValueOfSortedArrays(arrays, k) {
    var minHeap = buildHeap([], (a, b) => a[0] < b[0]);
    var allElements = 0;
    var element;
    var count = 0;
    arrays.forEach(function (value, i) {
        if (value.length > 0) {
            minHeap.push([value[0], i, 0]);
        }
        allElements += value.length;
    });
    if (allElements < k) {
        return null;
    }
    while (minHeap.length() > 0) {
        element = minHeap.pop();
        element[2] += 1;
        count += 1;
        if (arrays[element[1]].length > element[2]) {
            minHeap.push([
                arrays[element[1]][element[2]],
                element[1],
                element[2]
            ]);
        }
        if (count === k) {
            return element[0];
        }
    }
}
function kthSmallestElementInSortedMatrix(matrix, k) {
    var rows = matrix.length;
    var start = matrix[0][0];
    var end = matrix[rows - 1][rows - 1];
    var allElements = 0;
    var element;
    matrix.forEach(function (row) {
        allElements += row.length;
    });
    if (k < 1 || k > allElements) {
        return null;
    }
    while (start < end) {
        element = countElementLesserOrEqual(
            matrix,
            Math.floor(start + (end - start) / 2),
            matrix[0][0],
            matrix[rows - 1][rows - 1]
        );
        if (element[0] === k) {
            return element[1];
        }
        if (element[0] < k) {
            start = element[2];
        } else {
            end = element[1];
        }
    }
    return start;
}
function countElementLesserOrEqual(matrix, middle, smaller, larger) {
    var count = 0;
    var rows = matrix.length;
    var row = rows - 1;
    var col = 0;
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
    var minHeap = buildHeap([], (a, b) => a[0] < b[0]);
    var currentMax = Number.NEGATIVE_INFINITY;
    var element;
    var lowerBound;
    var upperBound;
    matrix.forEach(function (row, i) {
        if (row.length > 0) {
            currentMax = Math.max(currentMax, row[0]);
            minHeap.push([row[0], i, 0]);
        }
    });
    lowerBound = Number.NEGATIVE_INFINITY;
    upperBound = Number.POSITIVE_INFINITY;
    while (minHeap.length() >= matrix.length) {
        element = minHeap.pop();
        element[2] += 1;
        if (currentMax - element[0] < upperBound - lowerBound) {
            lowerBound = element[0];
            upperBound = currentMax;
        }
        if (element[2] < matrix[element[1]].length) {
            minHeap.push([
                matrix[element[1]][element[2]],
                element[1],
                element[2]
            ]);
            currentMax = Math.max(
                currentMax,
                matrix[element[1]][element[2]]
            );
        }
    }
    return [lowerBound, upperBound];
}
function kLargestSumPairsWith(array1, array2, k) {
    var minHeap = buildHeap(
        [],
        (a, b) => a[0] + a[1] < b[0] + b[1]
    );
    var element;
    var i = 0;
    var j;
    while (i < k && i < array1.length) {
        j = 0;
        while (j < k && j < array2.length) {
            if (minHeap.length() < k) {
                minHeap.push([array1[i], array2[j]]);
            } else {
                element = minHeap.peek();
                if (element[0] + element[1] < array1[i] + array2[j]) {
                    minHeap.pop();
                    minHeap.push([array1[i], array2[j]]);
                } else {
                    return minHeap.value();
                }
            }
            j += 1;
        }
        i += 1;
    }
}
function smallestElement(array, position) {
    if (array.length < position || position < 0) {
        return null;
    }
    return recursiveSmallestElement(Array.from(array), position, 0, array.length - 1);
}
function recursiveSmallestElement(array, position, low, high) {
    var pivotIndex = partition(array, low, high);
    if (pivotIndex === position - 1) {
        return array[pivotIndex];
    }
    if (pivotIndex > position - 1) {
        return recursiveSmallestElement(array, position, low, pivotIndex - 1);
    }
    return recursiveSmallestElement(array, position, pivotIndex + 1, high);
}
function partition(list, low, high) {
    var median;
    var pivotValue;
    var i;
    if (low === high) {
        return low;
    }
    median = medianOfMedians(list, low, high);
    i = low;
    while (i < high) {
        if (list[i] === median) {
            [list[i], list[high]] = [list[high], list[i]];
            break;
        }
        i += 1;
    }
    pivotValue = list[high];
    i = low;
    while (i < high) {
        if (list[i] < pivotValue) {
            [list[low], list[i]] = [list[i], list[low]];
            low += 1;
        }
        i += 1;
    }
    [list[low], list[high]] = [list[high], list[low]];
    return low;
}
function medianOfMedians(list, low, high) {
    var elements = high - low + 1;
    var medians = [];
    var partitions = [];
    var i = 0;
    if (elements < 5) {
        return list[low];
    }
    while (i < list.length) {
        if (i + 5 <= list.length) {
            partitions.push(list.slice(i, i + 5));
        }
        i += 5;
    }
    partitions.forEach((partition) => partition.sort((a, b) => a - b));
    i = 0;
    while (i < partitions.length) {
        medians.push(partitions[i][2]);
        i += 1;
    }
    return partition(medians, 0, medians.length - 1);
}

function group (array, fn) {
    var result;
    if (Array.isArray(array)) {
        result = array.reduce(function (accumulator, current) {
            var key = fn(current);
            if (accumulator[key.toString()]) {
                accumulator[key.toString()] = [
                    ...accumulator[key.toString()],
                    current
                ];
            } else {
                accumulator[key.toString()] = [current];
            }
            return accumulator;
        }, Object.create(null));
        return result;
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
Array.prototype.kSmallestElement = function (k) {
    return smallestElement(this, k);
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
Array.prototype.group = function (fn) {
    return group(this, fn);
}
module.exports = {
    kthSmallestElementInSortedMatrix
};
