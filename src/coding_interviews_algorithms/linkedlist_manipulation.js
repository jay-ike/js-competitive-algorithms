const { Node,buildHeap } = require("../utils");
function hasCycle(linkedList) {
  let slow = linkedList,
    fast = linkedList;
  while (fast) {
    fast = fast.next?.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}
function cycleLength(linkedList) {
  let slow = linkedList,
    fast = linkedList,
    length = 0;
  while (fast) {
    fast = fast.next?.next;
    slow = slow.next;
    length += 1;
    if (fast === slow) return length;
  }
  return 0;
}
function startingCycleNode(linkedList) {
  let slow = linkedList,
    fast = linkedList,
    elementsInCycle = cycleLength(linkedList);
  while (elementsInCycle > 0) {
    fast = fast.next;
    elementsInCycle -= 1;
  }
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
}
function isHappyNumber(number) {
  var slow = number,
    fast = number;
  while (true) {
    fast = new Number(fast).squareDigitsSum().squareDigitsSum();
    slow = new Number(slow).squareDigitsSum();
    if (fast === slow) break;
  }
  return slow === 1;
}
function middleNode(linkedList) {
  var slow = linkedList,
    fast = linkedList;
  while (fast) {
    fast = fast.next?.next;
    slow = slow.next;
    if (!fast?.next) return slow;
  }
  return slow;
}
function isPalindrome(linkedList) {
  var slow,
    fast,
    middle = middleNode(linkedList),
    result = false;
  slow = linkedList;
  let secondHalf = reverse(middle);
  fast = secondHalf;
  while (fast !== null && slow !== null) {
    if (fast.value !== slow.value) break;
    slow = slow.next;
    fast = fast.next;
  }
  if (fast === null || slow === null) result = true;
  secondHalf = reverse(secondHalf);
  middle.next = secondHalf.next;
  return result;
}
function reverse(head) {
  let prev = null,
    initialHead = head;
  next = null;
  while (initialHead !== null) {
    next = initialHead.next;
    initialHead.next = prev;
    prev = initialHead;
    initialHead = next;
  }
  return prev;
}
function alternateBothHalves(linkedList) {
  var firstHalf = linkedList,
    middle = middleNode(linkedList),
    secondHalf = reverse(middle);
  while (firstHalf !== null && secondHalf !== null) {
    let temp = firstHalf.next;
    firstHalf.next = secondHalf;
    firstHalf = temp;
    temp = secondHalf.next;
    secondHalf.next = firstHalf;
    secondHalf = temp;
  }
  if (firstHalf !== null) {
    firstHalf.next = null;
  }
}
function reverseInPlace(linkedList) {
  if (linkedList.next == null) return linkedList;
  var previous = null,
    current = linkedList.clone();
  while (current != null) {
    let currentNext = current.next;
    current.next = previous;
    previous = current;
    current = currentNext;
  }
  return previous;
}
function reverseRange(linkedList, startIndex, endIndex) {
  var previous = null,
    current = linkedList.clone(),
    result = current;
  index = 0;
  while (current != null && index < startIndex - 1) {
    previous = current;
    current = current.next;
    index++;
  }
  var firstHalfLastNode = previous;
  var subListLastNode = current;
  index = 0;
  while (current != null && index < endIndex - startIndex + 1) {
    let currentNext = current.next;
    current.next = previous;
    previous = current;
    current = currentNext;
    index++;
  }
  subListLastNode.next = current;
  if (firstHalfLastNode != null) {
    firstHalfLastNode.next = previous;
  } else {
    result = previous;
  }
  return result;
}
function reverseSublistsOfSize(linkedList, size) {
  if (linkedList == null || size <= 1) return linkedList;
  var current = linkedList.clone(),
    previous = null,
    head = null;
  while (true) {
    let firstHalfLastNode = previous,
      subListLastNode = current,
      index = 0;
    while (current != null && index < size) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      index++;
    }

    if (firstHalfLastNode == null) {
      head = previous;
    } else {
      firstHalfLastNode.next = previous;
    }
    subListLastNode.next = current;
    previous = subListLastNode;
    if (current == null) break;
  }
  return head;
}
function alternatelyReverseSublistsOfSize(linkedList, size) {
  var current = linkedList.clone(),
    previous = null,
    head = null;
  while (true) {
    let firstHalfLastNode = previous,
      subListLastNode = current,
      index = 0;
    while (current != null && index < size) {
      let next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      index++;
    }
    if (firstHalfLastNode == null) {
      head = previous;
    } else {
      firstHalfLastNode.next = previous;
    }
    subListLastNode.next = current;
    while (current != null && index < 2 * size) {
      previous = current;
      current = current.next;
      index++;
    }
    if (current == null) break;
  }
  return head;
}
function rotateBy(linkedList, size) {
  if (linkedList == null || linkedList.next == null || size < 1)
    return linkedList;
  var lastNode = linkedList.clone(),
    head = lastNode,
    listLength = 1;
  while (lastNode.next != null) {
    lastNode = lastNode.next;
    listLength++;
  }
  let rotatedListLastNode = head,
    rotations = listLength - (size % listLength);
  lastNode.next = head;
  for (let index = 0; index < rotations - 1; index++) {
    rotatedListLastNode = rotatedListLastNode.next;
  }
  head = rotatedListLastNode.next;
  rotatedListLastNode.next = null;
  return head;
}
function mergeSortedLinkedLists(lists) {
  var minHeap = buildHeap([], (a, b) => a.value < b.value)
  for (let i = 0; i < lists.length; i++){
    if (lists[i] != null) {
      minHeap.push(lists[i])
    }
  }
  let resultHead=null, resultTail=null;
  while (minHeap.length() > 0) {
    let node = minHeap.pop();
    if (resultHead == null) {
      resultHead = resultTail = node
    } else {
      resultTail.next = node
      resultTail = resultTail.next
    }
    if (node.next != null) minHeap.push(node.next)
  }
  return resultHead;
}
Node.prototype.hasCycle = function () {
  return hasCycle(this);
};
Node.prototype.startingCycleNode = function () {
  return startingCycleNode(this);
};
Number.prototype.isHappy = function () {
  return isHappyNumber(this);
};
Node.prototype.middleNode = function () {
  return middleNode(this);
};
Node.prototype.isPalindrome = function () {
  return isPalindrome(this);
};
Node.prototype.alternateBothHalves = function () {
  alternateBothHalves(this);
};
Node.prototype.reverseInPlace = function () {
  return reverseInPlace(this);
};
Node.prototype.reverseRange = function (startIndex, endIndex) {
  return reverseRange(this, startIndex, endIndex);
};
Node.prototype.reverseSublistsOfSize = function (size) {
  return reverseSublistsOfSize(this, size);
};
Node.prototype.alternatelyReverseSublistsOfSize = function (size) {
  return alternatelyReverseSublistsOfSize(this, size);
};
Node.prototype.rotateBy = function (size) {
  return rotateBy(this, size);
};
module.exports = { Node,mergeSortedLinkedLists };
