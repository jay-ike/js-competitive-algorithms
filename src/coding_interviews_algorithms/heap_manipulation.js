/*jslint
 node
*/

"use strict";
const {buildHeap} = require("../utils");

function buildNumberStream() {
    var minHeap = buildHeap([], (a, b) => a < b);
    var maxHeap = buildHeap([], (a, b) => a > b);
    function balanceHeaps() {
        if (maxHeap.length() > minHeap.length() + 1) {
            minHeap.push(maxHeap.pop());
        } else if (minHeap.length() > maxHeap.length()) {
            maxHeap.push(minHeap.pop());
        }
    }
    return {
        add(val) {
            var peek;
            if (maxHeap.length() > minHeap.length()) {
                if (maxHeap.peek() > val) {
                    peek = maxHeap.pop();
                    maxHeap.push(val);
                    minHeap.push(peek);
                } else {
                    minHeap.push(val);
                }
            } else {
                if (minHeap.peek() < val) {
                    peek = minHeap.pop();
                    maxHeap.push(peek);
                    minHeap.push(val);
                } else {
                    maxHeap.push(val);
                }
            }
        },
        findMedian() {
            var totalElements = maxHeap.length() + minHeap.length();
            if (totalElements % 2 === 0) {
                return (maxHeap.peek() + minHeap.peek()) / 2;
            }
            return maxHeap.peek();
        },
        remove(element) {
            if (element <= maxHeap.peek()) {
                maxHeap.delete(element);
            } else {
                minHeap.delete(element);
            }
            balanceHeaps();
        },
        totalElements() {
            return minHeap.length() + maxHeap.length();
        }
    };
}
function allMediansOfSubArrayOfSize(array, size) {
    var result = [];
    var start = 0;
    var stream = buildNumberStream();
    var i = 0;
    while (i < array.length) {
        if (i - start >= size) {
            result.push(stream.findMedian());
            stream.remove(array[start]);
            start += 1;
        }
        stream.add(array[i]);
        i += 1;
    }
    result.push(stream.findMedian());
    return result;
}
function findMaximumProfit(projects, profits, capital, numberOfProjects) {
    var finishedProjects = numberOfProjects;
    var currentCapital = capital;
    var allProjectsCapital = [...projects];
    var allProfits = [...profits];
    var minCapitals = buildHeap([], (a, b) => a < b);
    var maxProfits = buildHeap([], (a, b) => a.profit > b.profit);
    var i;
    while (finishedProjects > 0) {
        i = 0;
        while (i < allProjectsCapital.length) {
            if (allProjectsCapital[i] <= currentCapital) {
                minCapitals.push(allProjectsCapital[i]);
                maxProfits.push({
                    "capital": allProjectsCapital[i],
                    "profit": allProfits[i]
                });
            }
            i += 1;
        }
        if (minCapitals.length() > 0) {
            i = maxProfits.pop();
            currentCapital += i.profit;
            minCapitals.delete(i.capital);
            finishedProjects -= 1;
        } else {
            break;
        }
    }
    return currentCapital;
}
function addValueGreaterThanThePeek(value, heap, k) {
    var peek = heap.peek();
    if (value > peek && !Object.isNull(peek) && heap.length() === k) {
        heap.pop();
        heap.push(value);
    } else if (Object.isNull(peek) || heap.length() < k) {
        heap.push(value);
    }
}
function buildKLargestNumberInStream(array, k) {
    var minHeap = buildHeap([], (a, b) => a < b);
    var i;
    i = 0;
    while (i < k) {
        if (k <= array.length) {
            minHeap.push(array[i]);
        }
        i += 1;
    }
    i = k;
    while (i < array.length) {
        addValueGreaterThanThePeek(array[i], minHeap, k);
        i += 1;
    }
    return {
        add(value) {
            addValueGreaterThanThePeek(value, minHeap, k);
            if (minHeap.length() < k) {
                return null;
            }
            return minHeap.peek();
        }
    };
}
module.exports = {
    allMediansOfSubArrayOfSize,
    buildKLargestNumberInStream,
    buildNumberStream,
    findMaximumProfit
};
