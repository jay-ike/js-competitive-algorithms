const {
  Node,
} = require("../src/coding_interviews_algorithms/linkedlist_manipulation");
const { assert } = require("chai");

describe("linkedList operations", function () {
  var cycledLinkedList, noCycledLinkedList, secondCycled;
  beforeEach(function () {
    cycledLinkedList = new Node(1);
    cycledLinkedList.appendNode(new Node(2));
    cycledLinkedList.appendNode(new Node(3));
    cycledLinkedList.appendNode(new Node(4));
    cycledLinkedList.appendNode(new Node(5));
    cycledLinkedList.appendNode(new Node(6, cycledLinkedList.makeNMoves(2)));
    noCycledLinkedList = new Node(2);
    noCycledLinkedList.appendNode(new Node(3));
    secondCycled = new Node(1);
    secondCycled.appendNode(new Node(2));
    secondCycled.appendNode(new Node(3));
    secondCycled.appendNode(new Node(4));
    secondCycled.appendNode(new Node(5));
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
    assert.isTrue(new Number(23).isHappy());
    assert.isFalse(new Number(12).isHappy());
  });
});

describe("list middle node", function () {
  var node1, node2, alternateNode1, alternateNode2;
  beforeEach(function () {
    node1 = new Node(1);
    node1.appendNode(new Node(2));
    node1.appendNode(new Node(3));
    node1.appendNode(new Node(2));
    node1.appendNode(new Node(1));
    alternateNode1 = new Node(1);
    alternateNode1.appendNode(new Node(1));
    alternateNode1.appendNode(new Node(2));
    alternateNode1.appendNode(new Node(2));
    alternateNode1.appendNode(new Node(3));
    node2 = new Node(2);
    node2.appendNode(new Node(4));
    node2.appendNode(new Node(4));
    node2.appendNode(new Node(2));
    alternateNode2 = new Node(2);
    alternateNode2.appendNode(new Node(2));
    alternateNode2.appendNode(new Node(4));
    alternateNode2.appendNode(new Node(4));
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
});
