const { assert } = require("chai");
const {
  generateFrequencyMap,
  palindromePairsIndices,
  getRowSpace,
} = require("../src/coding_interviews_algorithms/string_manipulation");
describe("finding anagrams indices test", function () {
  var dictionary;
  before(function () {
    dictionary = { a: 1 };
  });
  it("should return the list of anagram indices", function () {
    assert.deepEqual(
      "latex is the de facto of xetal a laxet".findAnagramIndices("latex"),
      [0, 25, 33]
    );
  });
  it("should throw an exception if the wordLength is lesser than the textLength", function () {
    assert.throws(() => "ab".findAnagramIndices("ababababa"), Error);
  });
  it("should return the frequencyMap of a String", function () {
    assert.deepEqual(generateFrequencyMap("ababa"), { a: 3, b: 2 });
  });

  it("should decrement the value of a given key", function () {
    dictionary.decrementKeyValue("a");
    assert.equal(dictionary["a"], undefined);
  });
  it("should increment the value of a given key", function () {
    dictionary.incrementKeyValue("b");
    assert.equal(dictionary["b"], 1);
  });
});

describe("palindrome unique pairs test", function () {
  var inputs;
  before(function () {
    inputs = ["code", "edoc", "da", "d"];
  });
  it("should return the list of palindrome pairs", function () {
    assert.deepEqual(palindromePairsIndices(inputs), [
      [1, 0],
      [0, 1],
      [2, 3],
    ]);
  });

  it("should be empty if there's no palindrome", function () {
    assert.deepEqual(
      palindromePairsIndices(["code", "da", "data", "nobody"]),
      []
    );
  });
});

describe("zigzag printing algorithms test", function () {
  var text;
  var zigzag;
  before(function () {
    text = "thisiszigzagtest";
    zigzag = `t${getRowSpace(0, 0, 4)}z${getRowSpace(1, 0, 4)}t${getRowSpace(
      2,
      0,
      4
    )}\n${" ".repeat(1)}h${getRowSpace(0, 1, 4)}s${getRowSpace(
      1,
      1,
      4
    )}i${getRowSpace(2, 1, 4)}g${getRowSpace(3, 1, 4)}e${getRowSpace(
      4,
      1,
      4
    )}\n${" ".repeat(2)}i${getRowSpace(0, 2, 4)}i${getRowSpace(
      1,
      2,
      4
    )}g${getRowSpace(2, 2, 4)}a${getRowSpace(3, 2, 4)}s${getRowSpace(
      4,
      2,
      4
    )}\n${" ".repeat(3)}s${getRowSpace(0, 3, 4)}z${getRowSpace(
      1,
      3,
      4
    )}t${getRowSpace(2, 3, 4)}\n`;
  });

  it("should return the index of the third element of the second row in a 4-row configuration", function () {
    let index = getRowSpace(5, 0, 4);
    assert.equal(index, " ".repeat(5));
    assert.equal(getRowSpace(5, 1, 4), " ".repeat(1));
    assert.equal(getRowSpace(4, 1, 4), " ".repeat(3));
  });

  it("should print text in zigzag", function () {
    assert.equal(text.zigzag(4), zigzag);
  });
});

describe("longest palindrome substring test", function () {
  var text, forbiddenTokens;
  before(function () {
    text = "thisisatieddeitasi";
    forbiddenTokens = ["^", "$", "#"];
  });
  it("should return the longest palindrome substring of a given string", function () {
    assert.equal(text.longestPalindromeSubstring(), "isatieddeitasi");
  });
  it("should throw error if text contains forbidden token", function () {
    assert.throws(
      () => "$dkjd".longestPalindromeSubstring(),
      Error,
      "should not have forbidden token in text"
    );
  });
});

describe("tokenized string substitution", function () {
  var valuesObject, template, expected;
  before(function () {
    template = "hello $firstName $lastName how is your day";
    valuesObject = { firstName: "jay", lastName: "Ike" };
    expected = "hello jay Ike how is your day";
  });
  it("should replace the tokens in the template with the object value ", function () {
    assert.equal(template.replaceTokens(valuesObject), expected);
  });
});

describe("longest string with k distinct characters", function () {
  var input = "araaci";
  it("should return the length of that longest string", function () {
    let result = input.longestSubstringWithDistinctChars(2);
    assert.equal(result, 4);
  });
});

describe("longest substring with no repeating character", function () {
  it("should return the length of that substring", function () {
    assert.equal("aabccbb".longestSubstringNoRepeatingChars(), 3);
    assert.equal("abbbbbb".longestSubstringNoRepeatingChars(), 2);
    assert.equal("abccde".longestSubstringNoRepeatingChars(), 3);
    assert.equal("".longestSubstringNoRepeatingChars(), 0);
  });
});
