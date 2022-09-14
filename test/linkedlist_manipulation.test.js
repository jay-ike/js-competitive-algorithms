/*jslint
 node
 */
/*global describe, beforeEach, it */
const {
    Node,
    mergeSortedLinkedLists
} = require("../src/coding_interviews_algorithms/linkedlist_manipulation");
const {assert} = require("chai");

describe("linkedList operations", function () {
    var cycledLinkedList;
    var noCycledLinkedList;
    var secondCycled;
    beforeEach(function () {
        cycledLinkedList = Node.fromArray([1, 2, 3, 4, 5]);
        cycledLinkedList.appendNode(new Node(
            6,
            cycledLinkedList.makeNMoves(2)
        ));
        noCycledLinkedList = Node.fromArray([2, 3]);
        secondCycled = Node.fromArray([1, 2, 3, 4, 5]);
        secondCycled.appendNode(new Node(6, secondCycled.makeNMoves(3)));
    });
    it("should detect cycle in linkedList", function () {
        assert.isTrue(cycledLinkedList.hasCycle());
        assert.isFalse(noCycledLinkedList.hasCycle());
    });
    it("should return the starting node of the cycle", function () {
        assert.equal(
            cycledLinkedList.startingCycleNode().value,
            cycledLinkedList.makeNMoves(2).value
        );
        assert.equal(
            secondCycled.startingCycleNode().value,
            secondCycled.makeNMoves(3).value
        );
    });
});
describe("happy number detector", function () {
    it("should check if a number is a happy number", function () {
        assert.isTrue(Number(23).isHappy());
        assert.isFalse(Number(12).isHappy());
    });
});

describe("list middle node", function () {
    var node1;
    var node2;
    var alternateNode1;
    var alternateNode2;
    var list;
    var listClone;
    beforeEach(function () {
        node1 = Node.fromArray([1, 2, 3, 2, 1]);
        alternateNode1 = Node.fromArray([1, 1, 2, 2, 3]);
        node2 = Node.fromArray([2, 4, 4, 2]);
        alternateNode2 = Node.fromArray([2, 2, 4, 4]);
        list = Node.fromArray([2, 4, 6, 8, 10]);
        listClone = list.clone();
    });
    it("should return the middle node", function () {
        assert.equal(node1.middleNode(), node1.makeNMoves(2));
        node1.appendNode(new Node(6));
        assert.equal(node1.middleNode(), node1.makeNMoves(3));
        node1.appendNode(new Node(7));
        assert.equal(node1.middleNode(), node1.makeNMoves(3));
    });
    it("should check if a linked list is palindrome", function () {
        assert.isTrue(node1.isPalindrome());
        node1.appendNode(new Node(4));
        assert.isFalse(node1.isPalindrome());
        assert.isTrue(node2.isPalindrome());
    });
    it("should alternate both half", function () {
        node1.alternateBothHalves();

        assert.isTrue(node1.equals(alternateNode1));
        node2.alternateBothHalves();
        assert.isTrue(node2.equals(alternateNode2));
    });
    it("should reverse a linkedList", function () {
        var reversedList = Node.fromArray([10, 8, 6, 4, 2]);
        assert.isTrue(list.reverseInPlace().equals(reversedList));
        assert.isTrue(list.equals(listClone));
    });
    it("should reverse a range of a linkedList", function () {
        var reversedRange = Node.fromArray([2, 8, 6, 4, 10]);
        assert.isTrue(list.reverseRange(2, 4).equals(reversedRange));
        assert.isTrue(list.equals(listClone));
        reversedRange = Node.fromArray([8, 6, 4, 2, 10]);
        assert.isTrue(list.reverseRange(1, 4).equals(reversedRange));
    });
    it("should reverse every sublist of size k", function () {
        var reversedRange = Node.fromArray([4, 2, 8, 6, 10]);
        var singleNode = new Node(2);
        assert.isTrue(list.reverseSublistsOfSize(2).equals(reversedRange));
        assert.isTrue(list.equals(listClone));
        reversedRange = Node.fromArray([6, 4, 2, 10, 8]);
        assert.isTrue(list.reverseSublistsOfSize(3).equals(reversedRange));
        assert.isTrue(singleNode.reverseSublistsOfSize(0).equals(singleNode));
    });
    it("should reverse alternately every sublist of size k", function () {
        var linkedList = Node.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
        var linkedListClone = Node.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
        assert.isTrue(
            linkedList.alternatelyReverseSublistsOfSize(2).equals(
                Node.fromArray([2, 1, 3, 4, 6, 5, 7, 8])
            )
        );
        assert.isTrue(linkedList.equals(linkedListClone));
        assert.isTrue(
            linkedList.alternatelyReverseSublistsOfSize(3).equals(
                Node.fromArray([3, 2, 1, 4, 5, 6, 8, 7])
            )
        );
    });
    it("should rotate a linkedList by k element", function () {
        var rotatedBy3 = Node.fromArray([6, 8, 10, 2, 4]);
        assert.isTrue(list.rotateBy(3).equals(rotatedBy3));
        assert.isTrue(list.equals(listClone));
        assert.isTrue(list.rotateBy(0).equals(list));
        assert.isTrue(list.rotateBy(5).equals(list));
        assert.isTrue(list.rotateBy(2).equals(
            Node.fromArray([8, 10, 2, 4, 6])
        ));
        assert.isTrue(list.rotateBy(8).equals(rotatedBy3));
    });
});
describe("k-way merge problems", function () {
    var lists = [];
    it("should merge k sorted linkedList", function () {
        lists.push(Node.fromArray([2, 6, 8]));
        lists.push(Node.fromArray([3, 6, 7]));
        lists.push(Node.fromArray([1, 3, 4]));
        assert.isTrue(mergeSortedLinkedLists(lists).equals(
            Node.fromArray([1, 2, 3, 3, 4, 6, 6, 7, 8])
        ));
        lists = [Node.fromArray([5, 8, 9]), Node.fromArray([1, 7])];
        assert.isTrue(mergeSortedLinkedLists(lists).equals(
            Node.fromArray([1, 5, 7, 8, 9])
        ));
    });
});
