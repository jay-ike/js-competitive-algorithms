var assert = require("chai").assert;
var {
  groupAnagrams,
} = require("../src/coding_interviews_algorithms/string_manipulation");

describe("group anagrams elements in list", function () {
  var inputs, expected;
  before(function () {
    inputs = [
      "tab",
      "bat",
      "taste",
      "state",
      "teats",
      "ates",
      "eats",
      "teas",
      "seat",
    ];
    expected = [
      ["tab", "bat"],
      ["taste", "state", "teats"],
      ["ates", "eats", "teas", "seat"],
    ];
  });

  it("should group the inputs anagrams elements", function () {
    result = groupAnagrams(inputs);
    assert.deepEqual(result, expected);
  });
});
