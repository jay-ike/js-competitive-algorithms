const { buildHeap } = require("../utils");

function buildNumberStream() {
  var minHeap = buildHeap([], (a, b) => a < b),
    maxHeap = buildHeap([], (a, b) => a > b);
  function balanceHeaps() {
    if (maxHeap.length() > minHeap.length() + 1) {
      minHeap.push(maxHeap.pop());
    } else if (minHeap.length() > maxHeap.length()) maxHeap.push(minHeap.pop());
  }
  return {
    add(val) {
      if (maxHeap.length() > minHeap.length()) {
        if (maxHeap.peek() > val) {
          let peek = maxHeap.pop();
          maxHeap.push(val);
          minHeap.push(peek);
        } else {
          minHeap.push(val);
        }
      } else {
        if (minHeap.peek() < val) {
          let peek = minHeap.pop();
          maxHeap.push(peek);
          minHeap.push(val);
        } else {
          maxHeap.push(val);
        }
      }
    },
    findMedian() {
      let totalElements = maxHeap.length() + minHeap.length();
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
    },
  };
}
function allMediansOfSubArrayOfSize(array, size) {
  var result = [],
    start = 0,
    stream = buildNumberStream();
  for (let i = 0; i < array.length; i++) {
    if (i - start >= size) {
      result.push(stream.findMedian());
      stream.remove(array[start]);
      start++;
    }
    stream.add(array[i]);
  }
  result.push(stream.findMedian());
  return result;
}
function findMaximumProfit(projects, profits, capital, numberOfProjects) {
  var finishedProjects = numberOfProjects,
    currentCapital = capital,
    allProjectsCapital = [...projects],
    allProfits = [...profits],
    minCapitals = buildHeap([], (a, b) => a < b),
    maxProfits = buildHeap([], (a, b) => a.profit > b.profit);
  while (finishedProjects > 0) {
    for (let i = 0; i < allProjectsCapital.length; i++) {
      let capital = allProjectsCapital[i],
        profit = allProfits[i];
      if (capital <= currentCapital) {
        minCapitals.push(capital);
        maxProfits.push({ capital, profit });
      }
    }
    if (minCapitals.length() > 0) {
      let maxProfit = maxProfits.pop();
      currentCapital += maxProfit.profit;
      minCapitals.delete(maxProfit.capital);
      finishedProjects--;
    } else {
      break;
    }
  }
  return currentCapital;
}
function addValueGreaterThanThePeek(value, heap, k) {
  let peek = heap.peek();
  if (value > peek && peek != null && heap.length() === k) {
    heap.pop();
    heap.push(value);
  } else if (peek == null || heap.length() < k) heap.push(value);
}
function buildKLargestNumberInStream(array, k) {
  var minHeap = buildHeap([], (a, b) => a < b);
  for (let i = 0; i < k; i++) {
    if (k <= array.length) minHeap.push(array[i]);
  }
  for (let i = k; i < array.length; i++)
    addValueGreaterThanThePeek(array[i], minHeap, k);
  return {
    add(value) {
      addValueGreaterThanThePeek(value, minHeap, k);
      if (minHeap.length() < k) return null;
      return minHeap.peek();
    },
  };
}
module.exports = {
  buildNumberStream,
  allMediansOfSubArrayOfSize,
  findMaximumProfit,
  buildKLargestNumberInStream,
};
