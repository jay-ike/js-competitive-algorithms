/*jslint
 node
 */
/*global describe, it, before */

const {assert} = require("chai");
const {
    allCombinationsOfBalancedBracketsPairs,
    getRowSpace,
    groupAnagrams,
    palindromePairsIndices
} = require("../src/coding_interviews_algorithms/string_manipulation");

describe("group anagrams elements in list", function () {
    var inputs;
    var expected;
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
            "seat"
        ];
        expected = [
            ["tab", "bat"],
            ["taste", "state", "teats"],
            ["ates", "eats", "teas", "seat"]
        ];
    });

    it("should group the inputs anagrams elements", function () {
        var result = groupAnagrams(inputs);
        assert.deepEqual(result, expected);
    });
});

describe("finding anagrams indices test", function () {
    var input;
    it("should return the list of anagram indices", function () {
        input = "latex is the de facto of xetal a laxet";
        assert.deepEqual(
            input.findAnagramIndices("latex"),
            [0, 25, 33]
        );
    });
    it(
        "throws an exception if the wordLength < textLength",
        function () {
            input = "ab";
            assert.throws(() => input.findAnagramIndices("ababababa"), Error);
        }
    );
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
            [2, 3]
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
        zigzag = `t${getRowSpace(0, 0, 4)}z${getRowSpace(
            1,
            0,
            4
        )}t${getRowSpace(
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

    it("should print text in zigzag", function () {
        assert.equal(text.zigzag(4), zigzag);
    });
});

describe("longest palindrome substring test", function () {
    var text;
    before(function () {
        text = "thisisatieddeitasi";
    });
    it(
        "should return the longest palindrome substring of a given string",
        function () {
            assert.equal(text.longestPalindromeSubstring(), "isatieddeitasi");
            text = "cddpd";
            assert.equal(text.longestPalindromeSubstring(), "dpd");
            text = "dcddpda";
            assert.equal(text.longestPalindromeSubstring(), "dcd");
            text = "par";
            assert.equal(text.longestPalindromeSubstring(), "p");
        }
    );
});

describe("tokenized string substitution", function () {
    var valuesObject;
    var template;
    var expected;
    before(function () {
        template = "hello $firstName $lastName how is your day";
        valuesObject = {firstName: "jay", lastName: "Ike"};
        expected = "hello jay Ike how is your day";
    });
    it(
        "should replace the tokens in the template with the object value ",
        function () {
            assert.equal(template.replaceTokens(valuesObject), expected);
        }
    );
});

describe("longest string with k distinct characters", function () {
    var input = "araaci";
    it("should return the length of that longest string", function () {
        var result = input.longestSubstringWithDistinctChars(2);
        assert.equal(result, 4);
    });
});

describe("longest substring with no repeating character", function () {
    it("should return the length of that substring", function () {
        var input = "aabccbb";
        assert.equal(input.longestSubstringNoRepeatingChars(), 3);
        input = "abbbbbb";
        assert.equal(input.longestSubstringNoRepeatingChars(), 2);
        input = "abccde";
        assert.equal(input.longestSubstringNoRepeatingChars(), 3);
        input = "";
        assert.equal(input.longestSubstringNoRepeatingChars(), 0);
    });
});

describe("longest substring with same letters after replacement", function () {
    it("should return the length of that substring", function () {
        var input = "aabccbb";
        assert.equal(
            input.longestSubstringWithSameLettersAfterKReplacement(2),
            5
        );
        input = "abbcb";
        assert.equal(
            input.longestSubstringWithSameLettersAfterKReplacement(1),
            4
        );
        input = "abccde";
        assert.equal(
            input.longestSubstringWithSameLettersAfterKReplacement(1),
            3
        );
    });
});

describe("string has a permutation of a given pattern", function () {
    it("should tell if it's true or not", function () {
        var input = "oidbcaf";
        assert.isTrue(input.hasPermutationOf("abc"));
        input = "aaacb";
        assert.isTrue(input.hasPermutationOf("abc"));
        input = "odicf";
        assert.isFalse(input.hasPermutationOf("dc"));
        input = "bcdxabcdy";
        assert.isTrue(input.hasPermutationOf("bcdyabcdx"));
    });
});

describe("smallest substring containing all pattern's characters", function () {
    it("should return that substring", function () {
        var input = "aabdec";
        assert.equal(input.smallestSubstringContaining("abc"), "abdec");
        input = "abdabbc";
        assert.equal(input.smallestSubstringContaining("abc"), "abbc");
        input = "adcad";
        assert.equal(input.smallestSubstringContaining("abc"), "");
    });
});

describe("words concatenation indexes", function () {
    it("should return an array of all those indexes", function () {
        var input = "catfoxtofcat";
        assert.deepEqual(
            input.concatenatedWordsIndexes(["cat", "tof", "fox"]),
            [0, 3]
        );
        input = "catcatfoxfox";
        assert.deepEqual(input.concatenatedWordsIndexes(
            ["cat", "fox"]
        ), [3]);
    });
});
describe("comparing strings containing backspaces", function () {
    it("should check equality after backspace replacement ", function () {
        var input = "xy#z";
        assert.isTrue(input.equalAfterBackspaceWith("xzz#"));
        input = "x#yz";
        assert.isFalse(input.equalAfterBackspaceWith("xzz#"));
        input = "xp#";
        assert.isTrue(input.equalAfterBackspaceWith("xyz##"));
        input = "xywrrmp";
        assert.isTrue(input.equalAfterBackspaceWith("xywrrmu#p"));
    });
});
describe("string manipulations", function () {
    it(
        "should return the possible permutations by changing the case",
        function () {
            var input = "ad5?";
            assert.deepEqual(input.allCasePermutations(), [
                "ad5?",
                "Ad5?",
                "aD5?",
                "AD5?"
            ]);
            input = "ab7c";
            assert.deepEqual(input.allCasePermutations(), [
                "ab7c",
                "Ab7c",
                "aB7c",
                "AB7c",
                "ab7C",
                "Ab7C",
                "aB7C",
                "AB7C"
            ]);
        }
    );
    it(
        "should generate all combination of n pairs of balanced bracket",
        function () {
            assert.deepEqual(allCombinationsOfBalancedBracketsPairs(2), [
                "(())",
                "()()"
            ]);
            assert.deepEqual(allCombinationsOfBalancedBracketsPairs(3), [
                "((()))",
                "(()())",
                "(())()",
                "()(())",
                "()()()"
            ]);
        }
    );
    it("should return all unique abbreviations of a given word", function () {
        var input = "bat";
        assert.deepEqual(input.allUniqueAbbreviations(), [
            "3",
            "2t",
            "1a1",
            "1at",
            "b2",
            "b1t",
            "ba1",
            "bat"
        ]);
        input = "code";
        assert.deepEqual(input.allUniqueAbbreviations(), [
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
            "code"
        ]);
    });
    it(
        "returns all the possible evaluation of operations(+,-,*) supported",
        function () {
            var input = "1+2*3";
            assert.deepEqual(input.allPossibleEvaluations(), [7, 9]);
            input = "2*3-4-5";
            assert.deepEqual(
                input.allPossibleEvaluations(),
                [8, -12, 7, -7, -3]
            );
        }
    );
});
describe("frequency sort problems", function () {
    it(
        "constructs a string with characters in decreasing order of occurences",
        function () {
            var input = "programming";
            assert.equal(
                input.charactersWithMostFrequenciesFirst(),
                "rrggmmpaoin"
            );
            input = "abcbab";
            assert.equal(input.charactersWithMostFrequenciesFirst(), "bbbaac");
        }
    );
    it(
        "should rearrange a string avoiding same characters next to each other",
        function () {
            var input = "aappp";
            assert.equal(input.rearrangeAvoidingCloseSameCharacters(), "papap");
            input = "programming";
            assert.equal(
                input.rearrangeAvoidingCloseSameCharacters(),
                "rgmpaoinrgm"
            );
            input = "paaa";
            assert.equal(input.rearrangeAvoidingCloseSameCharacters(), "");
            input = "pdaaa";
            assert.equal(input.rearrangeAvoidingCloseSameCharacters(), "apada");
        }
    );
    it(
        "rearranges a string separating characters at least by k characters",
        function () {
            var input = "mmpp";
            assert.equal(
                input.rearrangeBySeparatingSameCharactersAtLeastBy(2),
                "mpmp"
            );
            input = "aab";
            assert.equal(
                input.rearrangeBySeparatingSameCharactersAtLeastBy(2),
                "aba"
            );
            input = "aappa";
            assert.equal(
                input.rearrangeBySeparatingSameCharactersAtLeastBy(3),
                ""
            );
            input = "programming";
            assert.equal(
                input.rearrangeBySeparatingSameCharactersAtLeastBy(3),
                "rgmpaoinrgm"
            );
        }
    );
});
