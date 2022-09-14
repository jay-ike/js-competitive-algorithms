/*jslint
 node
 */

"use strict";
const {buildHeap} = require("./utils");

function mergeSortedLists(sortedLists) {
    var halfListIndex;
    if (sortedLists.length <= 0) {
        throw new Error("cannot merge Empty Lists");
    }
    if (sortedLists.length === 1) {
        return sortedLists[0];
    } else if (sortedLists.length === 2) {
        return mergeTwoArrays(sortedLists[0], sortedLists[1]);
    } else {
        halfListIndex = Math.floor(sortedLists.length / 2);
        return mergeTwoArrays(
            mergeSortedLists(sortedLists.slice(0, halfListIndex)),
            mergeSortedLists(sortedLists.slice(halfListIndex))
        );
    }
}

function mergeTwoArrays(firstArray, secondArray) {
    var smallest;
    var greatest;
    var result = [];
    var comparator = function (val1, val2) {
        return val1 < val2;
    };
    var i;
    if (firstArray.length <= 0 || secondArray.length <= 0) {
        throw new Error("cannot merge empty arrays");
    }
    if (firstArray[0] > secondArray[0]) {
        smallest = buildHeap(secondArray, comparator);
        greatest = firstArray;
    } else {
        greatest = secondArray;
        smallest = buildHeap(firstArray, comparator);
    }
    result.push(smallest.pop());
    i = 0;
    while (i < greatest.length) {
        smallest.push(greatest[i]);
        result.push(smallest.pop());
        i += 1;
    }
    i = 0;
    while (i < smallest.length()) {
        smallest.push(Infinity);
        result.push(smallest.pop());
        i += 1;
    }
    return result;
}

module.exports = mergeSortedLists;
