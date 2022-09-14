/*jslint
 node, this
 */

"use strict";

const {Node, buildHeap} = require("../utils");
function hasCycle(linkedList) {
    var slow = linkedList;
    var fast = linkedList;
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
    var slow = linkedList;
    var fast = linkedList;
    var length = 0;
    while (fast) {
        fast = fast.next?.next;
        slow = slow.next;
        length += 1;
        if (fast === slow) {
            return length;
        }
    }
    return 0;
}
function startingCycleNode(linkedList) {
    var slow = linkedList;
    var fast = linkedList;
    var elementsInCycle = cycleLength(linkedList);
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
    var slow = number;
    var fast = number;
    while (true) {
        fast = fast.squareDigitsSum().squareDigitsSum();
        slow = slow.squareDigitsSum();
        if (fast === slow) {
            break;
        }
    }
    return slow === 1;
}
function middleNode(linkedList) {
    var slow = linkedList;
    var fast = linkedList;
    while (fast) {
        fast = fast.next?.next;
        slow = slow.next;
        if (!fast?.next) {
            return slow;
        }
    }
    return slow;
}
function isPalindrome(linkedList) {
    var slow;
    var fast;
    var middle = middleNode(linkedList);
    var result = false;
    var secondHalf = reverse(middle);
    slow = linkedList;
    fast = secondHalf;
    while (!Object.isNull(fast) && !Object.isNull(slow)) {
        if (fast.value !== slow.value) {
            break;
        }
        slow = slow.next;
        fast = fast.next;
    }
    if (Object.isNull(fast) || Object.isNull(slow)) {
        result = true;
    }
    secondHalf = reverse(secondHalf);
    middle.next = secondHalf.next;
    return result;
}
function reverse(head) {
    var prev = null;
    var initialHead = head;
    var next = null;
    while (!Object.isNull(initialHead)) {
        next = initialHead.next;
        initialHead.next = prev;
        prev = initialHead;
        initialHead = next;
    }
    return prev;
}
function alternateBothHalves(linkedList) {
    var firstHalf = linkedList;
    var middle = middleNode(linkedList);
    var secondHalf = reverse(middle);
    var temp;
    while (!Object.isNull(firstHalf) && !Object.isNull(secondHalf)) {
        temp = firstHalf.next;
        firstHalf.next = secondHalf;
        firstHalf = temp;
        temp = secondHalf.next;
        secondHalf.next = firstHalf;
        secondHalf = temp;
    }
    if (!Object.isNull(firstHalf)) {
        firstHalf.next = null;
    }
}
function reverseInPlace(linkedList) {
    var previous = null;
    var current = linkedList.clone();
    var currentNext;
    if (Object.isNull(linkedList.next)) {
        return linkedList;
    }
    while (!Object.isNull(current)) {
        currentNext = current.next;
        current.next = previous;
        previous = current;
        current = currentNext;
    }
    return previous;
}

function reverseRange(linkedList, startIndex, endIndex) {
    var previous = null;
    var current = linkedList.clone();
    var result = current;
    var index = 0;
    var firstHalfLastNode;
    var subListLastNode;
    var currentNext;
    while (!Object.isNull(current) && index < startIndex - 1) {
        previous = current;
        current = current.next;
        index += 1;
    }
    firstHalfLastNode = previous;
    subListLastNode = current;
    index = 0;
    while (!Object.isNull(current) && index < endIndex - startIndex + 1) {
        currentNext = current.next;
        current.next = previous;
        previous = current;
        current = currentNext;
        index += 1;
    }
    subListLastNode.next = current;
    if (!Object.isNull(firstHalfLastNode)) {
        firstHalfLastNode.next = previous;
    } else {
        result = previous;
    }
    return result;
}

function reverseSublistsOfSize(linkedList, size) {
    var current = linkedList.clone();
    var previous = null;
    var head = null;
    var firstHalfLastNode;
    var subListLastNode;
    var index;
    var next;
    if (Object.isNull(linkedList) || size <= 1) {
        return linkedList;
    }
    while (true) {
        firstHalfLastNode = previous;
        subListLastNode = current;
        index = 0;
        while (!Object.isNull(current) && index < size) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
            index += 1;
        }

        if (Object.isNull(firstHalfLastNode)) {
            head = previous;
        } else {
            firstHalfLastNode.next = previous;
        }
        subListLastNode.next = current;
        previous = subListLastNode;
        if (Object.isNull(current)) {
            break;
        }
    }
    return head;
}

function alternatelyReverseSublistsOfSize(linkedList, size) {
    var current = linkedList.clone();
    var previous = null;
    var head = null;
    var firstHalfLastNode;
    var subListLastNode;
    var index;
    var next;
    while (true) {
        firstHalfLastNode = previous;
        subListLastNode = current;
        index = 0;
        while (!Object.isNull(current) && index < size) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
            index += 1;
        }
        if (Object.isNull(firstHalfLastNode)) {
            head = previous;
        } else {
            firstHalfLastNode.next = previous;
        }
        subListLastNode.next = current;
        while (!Object.isNull(current) && index < 2 * size) {
            previous = current;
            current = current.next;
            index += 1;
        }
        if (Object.isNull(current)) {
            break;
        }
    }
    return head;
}
function rotateBy(linkedList, size) {
    var lastNode;
    var head;
    var listLength;
    var rotatedListLastNode;
    var rotations;
    var index;
    if (
        Object.isNull(linkedList)
        || Object.isNull(linkedList.next)
        || size < 1
    ) {
        return linkedList;
    }
    lastNode = linkedList.clone();
    head = lastNode;
    listLength = 1;
    while (!Object.isNull(lastNode.next)) {
        lastNode = lastNode.next;
        listLength += 1;
    }
    rotatedListLastNode = head;
    rotations = listLength - (size % listLength);
    lastNode.next = head;
    index = 0;
    while (index < rotations - 1) {
        rotatedListLastNode = rotatedListLastNode.next;
        index += 1;
    }
    head = rotatedListLastNode.next;
    rotatedListLastNode.next = null;
    return head;
}
function mergeSortedLinkedLists(lists) {
    var minHeap = buildHeap([], (a, b) => a.value < b.value);
    var resultHead;
    var resultTail;
    var node;
    var i = 0;
    while (i < lists.length) {
        if (!Object.isNull(lists[i])) {
            minHeap.push(lists[i]);
        }
        i += 1;
    }
    resultHead = null;
    resultTail = null;
    while (minHeap.length() > 0) {
        node = minHeap.pop();
        if (Object.isNull(resultHead)) {
            resultHead = node;
            resultTail = node;
        } else {
            resultTail.next = node;
            resultTail = resultTail.next;
        }
        if (!Object.isNull(node.next)) {
            minHeap.push(node.next);
        }
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

module.exports = {Node, mergeSortedLinkedLists};
