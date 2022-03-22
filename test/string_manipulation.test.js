const { assert } = require("chai");
const {
  palindromePairsIndices,
  getRowSpace,
  allCombinationsOfBalancedBracketsPairs,
} = require("../src/coding_interviews_algorithms/string_manipulation");
describe("finding anagrams indices test", function () {
  it("should return the list of anagram indices", function () {
    assert.deepEqual(
      "latex is the de facto of xetal a laxet".findAnagramIndices("latex"),
      [0, 25, 33]
    );
  });
  it("should throw an exception if the wordLength is lesser than the textLength", function () {
    assert.throws(() => "ab".findAnagramIndices("ababababa"), Error);
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
  var text;
  before(function () {
    text = "thisisatieddeitasi";
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

describe("longest substring with same letters after replacement", function () {
  it("should return the length of that substring", function () {
    assert.equal(
      "aabccbb".longestSubstringWithSameLettersAfterKReplacement(2),
      5
    );
    assert.equal(
      "abbcb".longestSubstringWithSameLettersAfterKReplacement(1),
      4
    );
    assert.equal(
      "abccde".longestSubstringWithSameLettersAfterKReplacement(1),
      3
    );
  });
});

describe("string has a permutation of a given pattern", function () {
  it("should tell if it's true or not", function () {
    assert.isTrue("oidbcaf".hasPermutationOf("abc"));
    assert.isTrue("aaacb".hasPermutationOf("abc"));
    assert.isFalse("odicf".hasPermutationOf("dc"));
    assert.isTrue("bcdxabcdy".hasPermutationOf("bcdyabcdx"));
  });
});

describe("smallest substring containing all pattern's characters", function () {
  it("should return that substring", function () {
    assert.equal("aabdec".smallestSubstringContaining("abc"), "abdec");
    assert.equal("abdabbc".smallestSubstringContaining("abc"), "abbc");
    assert.equal("adcad".smallestSubstringContaining("abc"), "");
  });
});

describe("words concatenation indexes", function () {
  it("should return an array of all those indexes", function () {
    assert.deepEqual(
      "catfoxtofcat".concatenatedWordsIndexes(["cat", "tof", "fox"]),
      [0, 3]
    );
    assert.deepEqual("catcatfoxfox".concatenatedWordsIndexes(["cat", "fox"]), [
      3,
    ]);
  });
});
describe("comparing strings containing backspaces", function () {
  it("should check equality after backspace replacement ", function () {
    assert.isTrue("xy#z".equalAfterBackspaceWith("xzz#"));
    assert.isFalse("x#yz".equalAfterBackspaceWith("xzz#"));
    assert.isTrue("xp#".equalAfterBackspaceWith("xyz##"));
    assert.isTrue("xywrrmp".equalAfterBackspaceWith("xywrrmu#p"));
  });
});
describe("string manipulations", function () {
  it("should return the possible permutations by changing the case", function () {
    assert.deepEqual("ad5?".allCasePermutations(), [
      "ad5?",
      "Ad5?",
      "aD5?",
      "AD5?",
    ]);
    assert.deepEqual("ab7c".allCasePermutations(), [
      "ab7c",
      "Ab7c",
      "aB7c",
      "AB7c",
      "ab7C",
      "Ab7C",
      "aB7C",
      "AB7C",
    ]);
  });
  it("should generate all combination of n pairs of balanced bracket", function () {
    assert.deepEqual(allCombinationsOfBalancedBracketsPairs(2), [
      "(())",
      "()()",
    ]);
    assert.deepEqual(allCombinationsOfBalancedBracketsPairs(3), [
      "((()))",
      "(()())",
      "(())()",
      "()(())",
      "()()()",
    ]);
  });
  it("should return all unique abbreviations of a given word", function () {
    assert.deepEqual("bat".allUniqueAbbreviations(), [
      "3",
      "2t",
      "1a1",
      "1at",
      "b2",
      "b1t",
      "ba1",
      "bat",
    ]);
    assert.deepEqual("code".allUniqueAbbreviations(), [
      "4",
      "3e",
      "2d1",
      "2de",
      "1o2",
      "1o1e",
      "1od1",
      "1ode",
      "c3",
      "c2e",
      "c1d1",
      "c1de",
      "co2",
      "co1e",
      "cod1",
      "code",
    ]);
  });
  it("should return all the possible evaluation of operations(+,-,*) supported", function () {
    assert.deepEqual("1+2*3".allPossibleEvaluations(), [7, 9]);
    assert.deepEqual("2*3-4-5".allPossibleEvaluations(), [8, -12, 7, -7, -3]);
  });
});
