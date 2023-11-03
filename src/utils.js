/*jslint
    for, node, this, bitwise
    */
"use strict";

let Node;
let TreeNode;

Object.prototype.method = function (name, func) {
    if (!this.hasOwnProperty(name)) {
        this[name] = func;
    }
};

Object.isNull = function (value) {
    return value === null || value === undefined;
};

function Node(value, next) {
    let self = Object.create(this);
    self.value = value;
    self.next = next;

    function appendNode(node) {
        let moves = 0;
        let currentNode = self;
        if (typeof node !== typeof self) {
            return;
        }

        while (currentNode.next) {
            moves += 1;
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        return moves;
    }

    function makeNMoves(n) {
        let index = 0;
        let child = self;
        if (n === 0) {
            return child;
        }
        while (index < n) {
            index += 1;
            if (child.next) {
                child = child.next;
            } else {
                return null;
            }
        }
        return child;
    }

    function equals(node) {
        let pointer1 = self;
        let pointer2 = node;
        while (!Object.isNull(pointer1) && !Object.isNull(pointer2)) {
            if (pointer1.value !== pointer2.value) {
                return false;
            }
            pointer1 = pointer1.next;
            pointer2 = pointer2.next;
        }
        if (!Object.isNull(pointer1) || !Object.isNull(pointer2)) {
            return false;
        }
        return true;
    }

    function clone() {
        let pointer = self;
        let node = new Node(pointer.value);
        pointer = pointer.next;
        while (!Object.isNull(pointer)) {
            node.appendNode(new Node(pointer.value));
            pointer = pointer.next;
        }
        return node;
    }

    self.method("makeNMoves", makeNMoves);
    self.method("clone", clone);
    self.method("appendNode", appendNode);
    self.method("equals", equals);
    return self;
};

Node.fromArray = function (arr) {
    let node = null;
    if (Array.isArray(arr)) {
        arr.forEach(function (value) {
            let currentNode = new Node(value);
            currentNode.next = node;
            node = currentNode;
        });
    }
    return node;
};

TreeNode = function (value, left = null, right = null, next = null) {
    let self = Object.create(this);
    self.value = value;
    self.left = left;
    self.right = right;
    self.next = next;

    function printLevelsOrder() {
        let nextLevelRoot = self;
        let result = [];
        let current;
        let levelValue;
        while (!Object.isNull(nextLevelRoot)) {
            current = nextLevelRoot;
            levelValue = "";
            nextLevelRoot = null;
            while (!Object.isNull(current)) {
                levelValue += ` ${current.value} ->`;
                if (Object.isNull(nextLevelRoot)) {
                    if (!Object.isNull(current.left)) {
                        nextLevelRoot = current.left;
                    } else if (!Object.isNull(current.right)) {
                        nextLevelRoot = current.right;
                    }
                }
                current = current.next;
            }

            result.push(`${levelValue.trim()} null`);
        }
        return result;
    }
    self.method("printLevelsOrder", printLevelsOrder);
    return self;
};

TreeNode.fromArray = function (array) {
    let index;
    let node;
    if (array.length < 1) {
        return null;
    }
    function buildNode(node, array, index) {
        let leftNode;
        let rightNode;
        let value;
        if (2 * index + 1 < array.length) {
            value = array[2 * index + 1];
            leftNode = (
                !Object.isNull(value)
                ? new TreeNode(value)
                : null
            );
            node.left = leftNode;
            if (!Object.isNull(leftNode)) {
                buildNode(leftNode, array, 2 * index + 1);
            }
        }
        if (2 * (index + 1) < array.length) {
            value = array[2 * (index + 1)];
            rightNode = (
                !Object.isNull(value)
                ? new TreeNode(value)
                : null
            );
            node.right = rightNode;
            if (!Object.isNull(rightNode)) {
                buildNode(rightNode, array, 2 * (index + 1));
            }
        }
    }
    index = 0;
    node = new TreeNode(array[index]);
    buildNode(node, array, index);
    return node;
};

function validateInterval(arr) {
    let begin = arr[0];
    let end = arr[1];
    if (begin > end) {
        throw new RangeError(`${arr} is an invalid interval`);
    }
}

function interval(arr) {
    if (arr.length !== 2) {
        throw new TypeError(`${arr} is not an interval`);
    }
    validateInterval(arr);
    return {
        begin: arr[0],
        end: arr[1]
    };
}

function job(arr) {
    validateInterval(arr);
    return {
        begin: arr[0],
        end: arr[1],
        load: arr[2]
    };
}

function buildHeap(array, comparator) {
    let heap = array;
    let i;
    function checkHeap(capacity, position, index) {
        return (
            position < capacity
            ? comparator(heap[position], heap[index])
            : false
        );
    }

    function heapify(arr, index) {
        let left = 2 * index + 1;
        let peek;
        let right = 2 * (index + 1);
        if (checkHeap(arr.length, left, index) === true) {
            peek = left;
        } else {
            peek = index;
        }
        if (checkHeap(arr.length, right, peek) === true) {
            peek = right;
        }
        if (peek !== index) {
            [arr[peek], arr[index]] = [arr[index], arr[peek]];
            heapify(arr, peek);
        }
    }
    i = Math.floor(heap.length / 2);
    while (i >= 0) {
        heapify(heap, i);
        i -= 1;
    }
    return {
        delete(element) {
            let index = heap.indexOf(element);
            if (index !== -1) {
                heap = [...array.slice(0, index), ...array.slice(index + 1)];
                heapify(heap, 0);
            }
        },

        length() {
            return heap.length;
        },

        peek() {
            return heap[0];
        },

        pop() {
            let peek = heap[0];
            heap = heap.slice(1);
            heapify(heap, 0);
            return peek;
        },

        push(element) {
            let index;
            let parent;
            heap.push(element);
            index = heap.length - 1;
            parent = Math.floor(index / 2);
            function isValid(child, parent) {
                return child > 0 && comparator(heap[child], heap[parent]);
            }

            while (isValid(index, parent) === true) {
                [heap[index], heap[parent]] = [heap[parent], heap[index]];
                index = parent;
                parent = Math.floor(index / 2);
            }
        },

        value() {
            return heap;
        }
    };
}

function squareDigitsSum(number) {
    let digit = 0;
    let result = 0;
    let copyNumber = number;
    while (copyNumber > 0) {
        digit = copyNumber % 10;
        result += digit ** 2;
        copyNumber = Math.floor(copyNumber / 10);
    }
    return result;
}

Number.prototype.intPart = function () {
    return this.toFixed();
};

Number.prototype.squareDigitsSum = function () {
    return squareDigitsSum(this);
};

Set.prototype.exclude = function (otherSet) {
    let set = new Set(this);
    otherSet.forEach(function (element) {
        set.delete(element);
    });
    return set;
};

Set.prototype.union = function (otherSet) {
    let set = new Set(this);
    otherSet.forEach(function (element) {
        if (!set.has(element)) {
            set.add(element);
        }
    });
    return set;
};

Set.prototype.intersectWith = function (otherSet) {
    let currentSize = this.size;
    let otherSetSize = otherSet.size;
    let lesserSet;
    let biggerSet;
    if (currentSize > otherSetSize) {
        lesserSet = otherSet;
        biggerSet = new Set(this);
    } else {
        lesserSet = new Set(this);
        biggerSet = otherSet;
    }
    lesserSet.forEach(function (element) {
        if (!biggerSet.has(element)) {
            lesserSet.delete(element);
        }
    });
    return lesserSet;
};

Array.generate = function (length, builder) {
    let index = 0;
    let result = [];
    while (index < length) {
        result.push(
            Object.isNull(builder)
            ? index
            : builder(index)
        );
        index += 1;
    }
    return result;
};

function throwIfNaN(number) {
    if (typeof number !== "number") {
        throw new Error(`${number} is not a Number`);
    }
}

function deleteIfZero(dictionary, key) {
    if (dictionary[key] === 0) {
        delete dictionary[key];
    }
}

function decrementKeyValue(dictionary, key, {deleteIfZero, step}) {
    let defaultStep = step ?? 1;
    if (Object.isNull(dictionary[key])) {
        return;
    }
    if (dictionary[key] === defaultStep && deleteIfZero) {
        delete dictionary[key];
    } else {
        dictionary[key] = (dictionary[key] ?? 0) - defaultStep;
    }
}

function incrementKeyValue(dictionary, key, {condition, step}) {
    if (condition ?? true) {
        dictionary[key] = (dictionary[key] ?? 0) + (step ?? 1);
    }
}

function emptyCallback() {
    return;
}

function buildArrayReader(arr) {
    return {
        getIndex(index) {
            if (index >= arr.length) {
                return Number.MAX_SAFE_INTEGER;
            }
            return arr[index];
        }
    };
}

function complementBase10Of(number) {
    let largestNumberWithSameDigit = 0;
    let numberOfDigits = 0;
    if (number === 0) {
        return 1;
    }
    while (largestNumberWithSameDigit < number) {
        largestNumberWithSameDigit += Math.pow(2, numberOfDigits);
        numberOfDigits += 1;
    }
    return largestNumberWithSameDigit ^ number;
}

function positionInSortedArray(array, element, comparatorCallback) {
    let left = 0;
    let right = array.length - 1;
    let mid;
    while (left < right) {
        mid = left + Math.floor((right - left) / 2);
        if (array[mid] === element) {
            return mid;
        }
        if (comparatorCallback(array[mid], element) < 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return right;
}

function buildFrequencyStack() {
    let frequencies = {};
    let maxHeap = buildHeap([], function (a, b) {
        if (a[1] !== b[1]) {
            return a[1] > b[1];
        }
        return a[2] > b[2];
    });
    let sequence = 0;
    return {
        pop() {
            let number = maxHeap.pop()[0];
            let params = {deleteIfZero: true, step: 1};
            frequencies.decrementKeyValue(number, params);
            return number;
        },

        push(number) {
            let params = {condition: true, step: 1};
            frequencies.incrementKeyValue(number, params);
            maxHeap.push([number, frequencies[number], sequence]);
            sequence += 1;
        }
    };
}

function longestRadiusFromCenter(
    transformedText,
    center,
    radius
) {
    while (
        center - (radius + 1) >= 0 &&
        center + radius + 1 < transformedText.length &&
        transformedText[center - (radius + 1)] ===
        transformedText[center + radius + 1]
    ) {
        radius += 1;
    }
    return radius;
}

function nextCenterFromPalindrome(
    center,
    oldCenter,
    oldRadius,
    allRadii
) {
    let mirroredCenter;
    let maxMirroredRadius;
    let radius = 0;
    while (center <= oldCenter + oldRadius) {
        mirroredCenter = 2 * oldCenter - center;
        maxMirroredRadius = oldCenter + oldRadius - center;
        if (allRadii[mirroredCenter] < maxMirroredRadius) {
            allRadii[center] = allRadii[mirroredCenter];
            center += 1;
        } else if (allRadii[mirroredCenter] > maxMirroredRadius) {
            allRadii[center] = maxMirroredRadius;
            center += 1;
        } else {
            radius = maxMirroredRadius;
            break;
        }
    }
    return [center, radius];
}

Object.prototype.incrementKeyValue = function (key, options = {}) {
    let condition = options.condition ?? true;
    let step = options.step ?? 1;
    incrementKeyValue(this, key, {condition, step});
};

Object.prototype.decrementKeyValue = function (key, options = {}) {
    let del = options.deleteIfZero ?? true;
    let step = options.step ?? 1;
    decrementKeyValue(this, key, {deleteIfZero: del, step});
};

Object.prototype.deleteIfZero = function (key) {
    deleteIfZero(this, key);
};
module.exports = {
    Node,
    TreeNode,
    buildArrayReader,
    buildFrequencyStack,
    buildHeap,
    complementBase10Of,
    emptyCallback,
    interval,
    job,
    longestRadiusFromCenter,
    nextCenterFromPalindrome,
    positionInSortedArray,
    throwIfNaN
};
