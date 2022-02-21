const { Node } = require("../utils");
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
module.exports = { Node };
