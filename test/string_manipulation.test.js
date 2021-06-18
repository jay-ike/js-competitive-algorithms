const { assert } = require("chai");
const { deleteIfZero,
    generateFrequencyMap,
    decrementKeyValue,
    incrementKeyValue,
    findAnagramIndices,
    isPalindrome,
    generateIndexesDictionary,
    PalindromePairsIndices,
    getRowSpace,
    zigzagString,
    throwIfContains,
    longestPalindromeSubstring,
} = require('../src/coding_interviews_algorithms/string_manipulation');
describe('finding anagrams indices test', function () {
    var dictionary;
    before(function () {
        dictionary = { 'a': 0 };
    });
    it('should return the list of anagram indices', function () {
        assert.deepEqual(findAnagramIndices('latex', 'latex is the de facto of xetal a laxet'), [0, 25, 33]);
    });
    it('should throw an exception if the wordLength is lesser than the textLength', function () {
        assert.throws(() => findAnagramIndices('ababababa', 'ab'), Error);
    });
    it('should empty a map key if its value is 0', function () {
        deleteIfZero(dictionary, 'a');
        assert.deepEqual(dictionary, {});
    });
    it('should return the frequencyMap of a String', function () {
        assert.deepEqual(generateFrequencyMap('ababa'), { 'a': 3, 'b': 2 });
    });

    it('should decrement the value of a given key', function () {
        decrementKeyValue(dictionary, 'a');
        assert.equal(dictionary['a'], -1);
    });
    it('should increment the value of a given key', function () {
        incrementKeyValue(dictionary, 'b');
        assert.equal(dictionary['b'], 1);
    });
});
 
describe('palindrome unique pairs test', function () {
    var inputs;
    before(function () {
        inputs = ['code', 'edoc', 'da', 'd'];
    });
    it('should return true if given a palindrome', function () {
        assert.isTrue(isPalindrome('dad'));
    });
    it('should return the list of palindrome pairs', function () {
        assert.deepEqual(PalindromePairsIndices(inputs), [[1, 0], [0, 1], [2, 3]]);
    });
    
    it('should generate a dictionary of words in a list with indexes', function () {
        assert.deepEqual(generateIndexesDictionary(inputs), { 'code': 0, 'edoc': 1, 'da': 2, 'd': 3 });
    });
});

describe('zigzag printing algorithms test', function () {
    var text;
    var zigzag;
    before(function () {
        text = 'thisiszigzagtest';
        zigzag = `t${getRowSpace(0, 0, 4)}z${getRowSpace(1, 0, 4)}t${getRowSpace(2,0,4)}\n${' '.repeat(1)}h${getRowSpace(0, 1, 4)}s${getRowSpace(1, 1, 4)}i${getRowSpace(2, 1, 4)}g${getRowSpace(3, 1, 4)}e${getRowSpace(4,1,4)}\n${' '.repeat(2)}i${getRowSpace(0, 2, 4)}i${getRowSpace(1, 2, 4)}g${getRowSpace(2, 2, 4)}a${getRowSpace(3, 2, 4)}s${getRowSpace(4,2,4)}\n${' '.repeat(3)}s${getRowSpace(0, 3, 4)}z${getRowSpace(1, 3, 4)}t${getRowSpace(2,3,4)}\n`;
    });

    it('should return the index of the third element of the second row in a 4-row configuration', function () {
        let index = getRowSpace(5,0, 4);
        assert.equal(index, ' '.repeat(5));
        assert.equal(getRowSpace(5, 1, 4), ' '.repeat(1));
        assert.equal(getRowSpace(4,1,4),' '.repeat(3))
    });

    it('should print text in zigzag', function () {
        assert.equal(zigzagString(text,4), zigzag);
    });
});

describe('longest palindrome substring test', function () {
    var text,forbiddenTokens;
    before(function () {
        text = 'thisisatieddeitasi';
        forbiddenTokens = ['^','$','#']
    });
    it('should return the longest palindrome substring of a given string', function () {
        assert.equal(longestPalindromeSubstring(text), 'isatieddeitasi');
    });
    it('should throw error if text contains forbidden token', function () {
        assert.throws(() => throwIfContains(forbiddenTokens, '$dkjd'), Error,'should not have forbidden token in text');
    });
});
