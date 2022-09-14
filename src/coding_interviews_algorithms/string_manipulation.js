/*jslint
 node, this
*/
/*global ArgumentError */

"use strict";
const {
    buildHeap,
    longestRadiusFromCenter,
    nextCenterFromPalindrome
} = require("../utils");
function throwIfLongerThan(pattern, text) {
    if (pattern.length > text.length) {
        throw new Error(
            `${pattern} length should be lesser or equal to ${text} length`
        );
    }
}
function decrementValueIfTrue(
    condition,
    dictionary,
    key,
    incrementIndex,
    incrementMatch
) {
    if (condition) {
        dictionary.decrementKeyValue(
            key,
            {deleteIfZero: false, step: 1}
        );
    }
    if (dictionary[key] === 0) {
        incrementMatch();
    }
    incrementIndex();
}
function findAnagramIndices(word, text) {
    var result = [];
    var frequencyMap;
    var startIndex;
    var endIndex;
    var expectedMatches;
    var currentMatches;
    throwIfLongerThan(word, text);
    frequencyMap = generateFrequencyMap(word);
    startIndex = 0;
    endIndex = 0;
    currentMatches = 0;
    expectedMatches = Object.keys(frequencyMap).reduce(
        (prev, current) => prev + frequencyMap[current],
        0
    );
    while (endIndex < text.length) {
        decrementValueIfTrue(
            endIndex - startIndex < word.length,
            frequencyMap,
            text[endIndex],
            function () {
                endIndex += 1;
            },
            function () {
                currentMatches += 1;
            }
        );
        if (currentMatches === expectedMatches) {
            result.push(startIndex);
        }
        if (endIndex - startIndex >= word.length) {
            if (frequencyMap[text[startIndex]] === 0) {
                currentMatches -= 1;
            }
            frequencyMap.incrementKeyValue(text[startIndex]);
            startIndex += 1;
        }
    }
    return result;
}

function generateFrequencyMap(word) {
    var map = {};
    Object.keys(word).forEach(function (key) {
        map.incrementKeyValue(word[key]);
    });
    return map;
}

function searchPalindromeIndices(
    index,
    dictionary,
    element,
    onFound
) {
    var prefix;
    var suffix;
    var reverseSuffix;
    var reversePrefix;
    var characterIndex = 0;
    while (characterIndex < element.length) {
        prefix = element.slice(0, characterIndex);
        suffix = element.slice(characterIndex);
        reversePrefix = [...prefix];
        reversePrefix = reversePrefix.reverse().join("");
        reverseSuffix = [...suffix];
        reverseSuffix = reverseSuffix.reverse().join("");
        if (
            dictionary.hasOwnProperty(reversePrefix)
            && isPalindrome(suffix)
        ) {
            if (index !== dictionary[reversePrefix]) {
                onFound([index, dictionary[reversePrefix]]);
            }
        }
        if (
            dictionary.hasOwnProperty(reverseSuffix)
            && isPalindrome(prefix)
        ) {
            if (index !== dictionary[reverseSuffix]) {
                onFound([dictionary[reverseSuffix], index]);
            }
        }
        characterIndex += 1;
    }
}

function palindromePairsIndices(wordList) {
    var result = [];
    var dictionary = generateIndexesDictionary(wordList);
    var element;
    var index = 0;
    while (index < wordList.length) {
        element = wordList[index];
        searchPalindromeIndices(
            index,
            dictionary,
            element,
            function (value) {
                result.push(value);
            }
        );
        index += 1;
    }
    return result;
}

function generateIndexesDictionary(wordList) {
    var dictionary = {};
    var index = 0;
    while (index < wordList.length) {
        const element = wordList[index];
        dictionary[element] = index;
        index += 1;
    }
    return dictionary;
}

function isPalindrome(word) {
    var reversedWord = [...word];
    reversedWord = reversedWord.reverse().join("");
    return word === reversedWord;
}

function zigzagString(string, totalRows) {
    var result = "";
    var index = 0;
    var itemPosition;
    var characterIndex;
    var stringLength = string.length;
    if (totalRows < 2) {
        throw new Error(`${totalRows} must be greater or equal than 2`);
    }
    while (index < totalRows) {
        itemPosition = 0;
        characterIndex = index;
        result = `${result}${" ".repeat(index)}`;
        while (characterIndex < stringLength) {
            result = `${result}${string[characterIndex]}${getRowSpace(
                itemPosition,
                index,
                totalRows
            )}`;
            itemPosition += 1;
            if (index === 0 || index === totalRows - 1) {
                characterIndex += 2 * (totalRows - 1);
            } else {
                characterIndex += (
                    itemPosition % 2 === 0
                    ? 2 * index
                    : 2 * (totalRows - index - 1)
                );
            }
        }
        result = `${result}\n`;
        index += 1;
    }
    return result;
}

function getRowSpace(itemPosition, rowIndex, totalRows) {
    if (totalRows <= rowIndex) {
        throw new Error(`${totalRows} must be greater than ${rowIndex}`);
    }
    if (rowIndex < 0) {
        throw new Error(`${rowIndex} must be greater or equal than 0`);
    }
    if (rowIndex === totalRows - 1 || rowIndex === 0) {
        return " ".repeat(2 * totalRows - 3);
    } else {
        return " ".repeat(
            itemPosition % 2 === 0
            ? 2 * (totalRows - rowIndex) - 3
            : 2 * rowIndex - 1
        );
    }
}

function longestPalindromeSubstring(text, separator = "#") {
    var range;
    var transformedText = [...text].join(separator);
    transformedText = separator + transformedText + separator;
    range = longestPalindromeRange(transformedText);
    if (text.length <= 1) {
        return text;
    }
    return text.slice(range[0], range[1]);
}

function longestPalindromeRange(transformedText) {
    var allRadii = new Array(transformedText.length).fill(0);
    var center = 0;
    var radius = 0;
    var maxRadius = Number.NEGATIVE_INFINITY;
    var maxRadiusIndex = 0;
    var oldCenter;
    var oldRadius;

    while (center < transformedText.length) {
        radius = longestRadiusFromCenter(
            transformedText,
            center,
            radius
        );
        if (maxRadius < radius) {
            maxRadius = radius;
            maxRadiusIndex = center;
        }
        allRadii[center] = radius;
        oldCenter = center;
        oldRadius = radius;
        center += 1;
        radius = 0;
        [center, radius] = nextCenterFromPalindrome(
            center,
            oldCenter,
            oldRadius,
            allRadii
        );
    }
    return [
        Math.floor((maxRadiusIndex - maxRadius) / 2),
        Math.floor((maxRadiusIndex + maxRadius) / 2)
    ];
}

function groupAnagrams(list) {
    var anagramDict = {};
    var result = [];
    list.forEach(function (element) {
        var sortedLetters = [...element];
        sortedLetters.sort().join("");
        if (anagramDict.hasOwnProperty(sortedLetters)) {
            anagramDict[sortedLetters].push(element);
        } else {
            anagramDict[sortedLetters] = [element];
        }
    });
    Object.getOwnPropertyNames(anagramDict).forEach(
        (element) => result.push(anagramDict[element])
    );
    return result;
}

function replaceTokens(template, valuesObject, tokenIndicator = "$") {
    var properties = Object.keys(valuesObject).filter(
        (val) => typeIsPermitted(
            ["number", "string"],
            valuesObject[val]
        )
    );
    var result = template;
    properties.forEach(function (value) {
        result = result.split(
            `${tokenIndicator}${value}`
        ).join(`${valuesObject[value]}`);
    });
    return result;
}

function typeIsPermitted(permittedTypes, value) {
    return permittedTypes.some((x) => x === typeof value);
}
function longestSubstringWithDistinctChars(input, distinctChars) {
    var charsDictionary = {};
    var result = "";
    var subString = "";
    var start = 0;
    var end = 0;
    while (end <= input.length) {
        if (
            Object.keys(charsDictionary).length < distinctChars ||
            !Object.isNull(charsDictionary[input[end]])
        ) {
            subString = input.slice(start, end + 1);
            charsDictionary.incrementKeyValue(input[end]);
            end += 1;
        } else {
            result = longestString(subString, result);
            while (Object.keys(charsDictionary).length >= distinctChars) {
                charsDictionary.decrementKeyValue(input[start]);
                start += 1;
            }
        }
    }
    return result.length;
}

function longestSubstringNoRepeatingChars(string) {
    var charsDictionary = {};
    var result = "";
    var substring = "";
    var startIndex = 0;
    var endIndex = 0;
    while (endIndex <= string.length) {
        if (Object.isNull(charsDictionary[string[endIndex]])) {
            substring = string.slice(startIndex, endIndex + 1);
            charsDictionary.incrementKeyValue(string[endIndex]);
            endIndex += 1;
        } else {
            result = longestString(result, substring);
            while (!Object.isNull(charsDictionary[string[endIndex]])) {
                charsDictionary.decrementKeyValue(string[startIndex]);
                startIndex += 1;
            }
        }
    }
    return result.length;
}

function longestSubstringWithSameLettersAfterKReplacement(
    string,
    replacements
) {
    var charsDictionary = {};
    var result = "";
    var substring = "";
    var startIndex = 0;
    var toBeReplaced = 0;
    var endIndex = 0;
    while (endIndex < string.length) {
        if (
            toBeReplaced <= replacements ||
            string[startIndex] === string[endIndex]
        ) {
            toBeReplaced += addReplacement(
                charsDictionary,
                string[endIndex],
                string[startIndex]
            );
            charsDictionary.incrementKeyValue(string[endIndex]);
            endIndex += 1;
            substring = string.slice(startIndex, endIndex);
        } else {
            while (toBeReplaced > replacements) {
                toBeReplaced -= removeReplacement(
                    charsDictionary,
                    string[startIndex]
                );
                charsDictionary.decrementKeyValue(string[startIndex]);
                startIndex += 1;
            }
        }
        result = longestString(result, substring);
    }
    return result.length;
}

function hasPermutationOf(string, pattern) {
    var startIndex = 0;
    var endIndex = 0;
    var charactersDictionary = {};
    var patternCharacters = generateFrequencyMap(pattern);
    while (endIndex < string.length) {
        if (endIndex - startIndex < pattern.length) {
            charactersDictionary.incrementKeyValue(string[endIndex]);
            endIndex += 1;
        } else {
            if (
                Object.keys(charactersDictionary).every(
                    (key) =>
                    charactersDictionary[key] === patternCharacters[key]
                )
            ) {
                return true;
            }
            while (endIndex - startIndex >= pattern.length) {
                charactersDictionary.decrementKeyValue(string[startIndex]);
                startIndex += 1;
            }
        }
    }
    return Object.keys(charactersDictionary).every(
        (key) => charactersDictionary[key] === patternCharacters[key]
    );
}
function addReplacement(charsDictionary, currentChar, firstChar) {
    return (
        (!Object.isNull(
            charsDictionary[currentChar]
        ) || currentChar !== firstChar)
        ? 1
        : 0
    );
}

function removeReplacement(charsDictionary, currentChar) {
    return (
        charsDictionary[currentChar] === 1
        ? 1
        : 0
    );
}

function longestString(string1, string2) {
    return (
        string1.length > string2.length
        ? string1
        : string2
    );
}

function smallestSubstringContaining(text, pattern) {
    var result = "";
    var frequencyMap;
    var startIndex;
    var endIndex;
    var currentMatches;
    var expectedMatches;
    throwIfLongerThan(pattern, text);
    frequencyMap = generateFrequencyMap(pattern);
    startIndex = 0;
    endIndex = 0;
    currentMatches = 0;
    expectedMatches = Object.keys(frequencyMap).reduce(
        (prev, current) => prev + frequencyMap[current],
        0
    );
    while (endIndex < text.length) {
        decrementValueIfTrue(
            currentMatches < expectedMatches,
            frequencyMap,
            text[endIndex],
            function () {
                endIndex += 1;
            },
            function () {
                currentMatches += 1;
            }
        );
        if (currentMatches === expectedMatches) {
            result = longestString(
                result,
                text.slice(startIndex, endIndex + 1)
            );
        }
        if (
            frequencyMap[text[startIndex]] < 0 ||
            Object.isNull(frequencyMap[text[startIndex]])
        ) {
            frequencyMap.incrementKeyValue(text[startIndex]);
            startIndex += 1;
        }
    }
    return result;
}

function searchWordIndex(
    index,
    frequencies,
    words,
    originalWord,
    onFound
) {
    var i = 0;
    var nextWordIndex;
    var word;
    var seenWords = {};
    while (i < words.length) {
        nextWordIndex = index + i * words[0].length;
        word = originalWord.slice(
            nextWordIndex,
            nextWordIndex + words[0].length
        );
        if (Object.isNull(frequencies[word])) {
            break;
        }
        seenWords.incrementKeyValue(word);
        if (seenWords[word] > (frequencies[word] || 0)) {
            break;
        }
        if (i + 1 === words.length) {
            onFound(index);
        }
        i += 1;
    }
}
function concatenatedWordsIndexes(string, words) {
    var result = [];
    var wordFrequency = {};
    var concatenatedWordsLength = words.join("").length;
    var index = 0;
    words.forEach((word) => wordFrequency.incrementKeyValue(word));
    while (
        index < string.length - concatenatedWordsLength + 1
    ) {
        searchWordIndex(
            index,
            wordFrequency,
            words,
            string,
            function (value) {
                result.push(value);
            }
        );
        index += 1;
    }
    return result;
}
function equalAfterBackspace(str1, str2, bacKspaceChar = "#") {
    return (
        computeBackspace(str1, bacKspaceChar) ===
        computeBackspace(str2, bacKspaceChar)
    );
}
function computeBackspace(str, backspaceChar) {
    var result = "";
    var backspace = 0;
    var index = str.length - 1;
    while (index >= 0) {
        if (str[index] === backspaceChar) {
            backspace += 1;
        } else {
            if (backspace > 0) {
                backspace -= 1;
            } else {
                result += str[index];
            }
        }
        index -= 1;
    }
    return result;
}
function allCasePermutations(str) {
    var permutations = [[...str].join("")];
    var i = 0;
    var newPermutation;
    var j;
    var permutationLength;
    while (i < str.length) {
        if (str[i].toUpperCase() !== str[i].toLowerCase()) {
            permutationLength = permutations.length;
            j = 0;
            while (j < permutationLength) {
                newPermutation = [...permutations[j]];
                if (newPermutation[i] === newPermutation[i].toUpperCase()) {
                    newPermutation[i] = newPermutation[i].toLowerCase();
                } else {
                    newPermutation[i] = newPermutation[i].toUpperCase();
                }
                permutations.push(newPermutation.join(""));
                j += 1;
            }
        }
        i += 1;
    }
    return permutations;
}
function createParenthesesBuilder(str, openedBrackets, closedBrackets) {
    return {
        addCloseBracket() {
            return createParenthesesBuilder(
                `${str})`,
                openedBrackets,
                closedBrackets + 1
            );
        },
        addOpenBracket() {
            return createParenthesesBuilder(
                `${str}(`,
                openedBrackets + 1,
                closedBrackets
            );
        },
        closedBrackets,
        openedBrackets,
        str
    };
}
function allCombinationsOfBalancedBracketsPairs(numberOfPairs) {
    var permutations = [];
    var result = [];
    var currentBrackets;
    permutations.push(createParenthesesBuilder("", 0, 0));
    while (permutations.length > 0) {
        currentBrackets = permutations.shift();
        if (
            currentBrackets.openedBrackets === numberOfPairs &&
            currentBrackets.closedBrackets === numberOfPairs
        ) {
            result.push(currentBrackets.str);
        }
        if (currentBrackets.openedBrackets < numberOfPairs) {
            permutations.push(currentBrackets.addOpenBracket());
        }
        if (currentBrackets.closedBrackets < currentBrackets.openedBrackets) {
            permutations.push(currentBrackets.addCloseBracket());
        }
    }
    return result;
}
function createAbbreviationBuilder(str, abbreviations) {
    return {
        abbreviate() {
            return createAbbreviationBuilder(str, abbreviations + 1);
        },
        abbreviations,
        placeChar(character) {
            var newString = str;
            if (abbreviations < 1) {
                newString = `${newString}${character}`;
            } else {
                newString = `${newString}${abbreviations}${character}`;
            }
            return createAbbreviationBuilder(newString, 0);
        },
        print() {
            var result = "";
            if (abbreviations === 0) {
                result = str;
            } else {
                result = `${str}${abbreviations}`;
            }
            return result;
        },
        str
    };
}
function allUniqueAbbreviations(str) {
    var abbreviations = [];
    var result = [];
    var abbreviationSize;
    var currentAbbreviation;
    var i = 0;
    var j;
    abbreviations.push(createAbbreviationBuilder("", 0));
    while (i < str.length) {
        abbreviationSize = abbreviations.length;
        j = 0;
        while (j < abbreviationSize) {
            currentAbbreviation = abbreviations.shift();
            abbreviations.push(
                currentAbbreviation.abbreviate(),
                currentAbbreviation.placeChar(str[i])
            );
            j += 1;
        }
        i += 1;
    }
    while (abbreviations.length > 0) {
        currentAbbreviation = abbreviations.shift();
        result.push(currentAbbreviation.print());
    }
    return result;
}
function allPossibleEvaluations(str) {
    var result = [];
    var k;
    var j;
    var i;
    var leftPart;
    var rightPart;
    var leftOperand;
    var char;
    if (!str.includes("+") && !str.includes("-") && !str.includes("*")) {
        result.push(Number.parseInt(str, 10));
    } else {
        i = 0;
        while (i < str.length) {
            char = str[i];
            if (Number.isNaN(Number.parseInt(char))) {
                leftPart = allPossibleEvaluations(str.substring(0, i));
                rightPart = allPossibleEvaluations(str.substring(i + 1));
                j = 0;
                while (j < leftPart.length) {
                    leftOperand = leftPart[j];
                    k = 0;
                    while (k < rightPart.length) {
                        if (char === "+") {
                            result.push(leftOperand + rightPart[k]);
                        } else if (char === "-") {
                            result.push(leftOperand - rightPart[k]);
                        } else if (char === "*") {
                            result.push(leftOperand * rightPart[k]);
                        }
                        k += 1;
                    }
                    j += 1;
                }
            }
            i += 1;
        }
    }
    return result;
}
function characterFrequencies(str, heapComparator) {
    var frequencies = {};
    var heap = buildHeap([], heapComparator);
    Object.keys(str).forEach(
        (key) => frequencies.incrementKeyValue(str[key])
    );
    Object.keys(frequencies).forEach(
        (key) => heap.push([key, frequencies[key]])
    );
    return [frequencies, heap];
}
function charactersWithMostFrequenciesFirst(str) {
    var frequencies = characterFrequencies(
        str,
        (a, b) => a[1] > b[1]
    );
    var result = "";
    var characterDetails;
    while (frequencies[1].length() > 0) {
        characterDetails = frequencies[1].pop();
        result += characterDetails[0].repeat(
            characterDetails[1]
        );
    }
    return result;
}
function rearrangeAvoidingCloseSameCharacters(str) {
    var result = "";
    var frequencies = characterFrequencies(
        str,
        (a, b) => a[1] > b[1]
    );
    var previousChar = null;
    var previousCount = 0;
    var characterDetails;
    while (frequencies[1].length() > 0) {
        characterDetails = frequencies[1].pop();
        if (!Object.isNull(previousChar) && previousCount > 0) {
            frequencies[1].push([previousChar, previousCount]);
        }
        previousChar = characterDetails[0];
        previousCount = characterDetails[1] - 1;
        result += characterDetails[0];
    }
    return (
        result.length === str.length
        ? result
        : ""
    );
}
function rearrangeBySeparatingSameCharactersAtLeastBy(str, k) {
    var frequencies = characterFrequencies(str, (a, b) => a[1] > b[1]);
    var queue = [];
    var result = "";
    var characterDetails;
    while (frequencies[1].length() > 0) {
        characterDetails = frequencies[1].pop();
        if (!Object.isNull(characterDetails[0]) && characterDetails[1] >= 1) {
            result += characterDetails[0];
            queue.push([characterDetails[0], characterDetails[1] - 1]);
        }
        if (queue.length === k) {
            frequencies[1].push(queue.shift());
        }
    }
    return (
        result.length === str.length
        ? result
        : ""
    );
}
String.prototype.findAnagramIndices = function (word) {
    return findAnagramIndices(word, this);
};
String.prototype.zigzag = function (totalRows) {
    return zigzagString(this, totalRows);
};
String.prototype.longestPalindromeSubstring = function () {
    return longestPalindromeSubstring(this);
};
String.prototype.replaceTokens = function (valuesObject, tokenIndicator) {
    return replaceTokens(this, valuesObject, tokenIndicator);
};
String.prototype.longestSubstringWithDistinctChars = function (distinctChars) {
    return longestSubstringWithDistinctChars(this, distinctChars);
};
String.prototype.longestSubstringNoRepeatingChars = function () {
    return longestSubstringNoRepeatingChars(this);
};

String.prototype.longestSubstringWithSameLettersAfterKReplacement = function (
    replacements
) {
    return longestSubstringWithSameLettersAfterKReplacement(this, replacements);
};
String.prototype.hasPermutationOf = function (pattern) {
    return hasPermutationOf(this, pattern);
};
String.prototype.smallestSubstringContaining = function (pattern) {
    return smallestSubstringContaining(this, pattern);
};
String.prototype.concatenatedWordsIndexes = function (wordList) {
    return concatenatedWordsIndexes(this, wordList);
};
String.prototype.equalAfterBackspaceWith = function (str, backspaceChar) {
    return equalAfterBackspace(this, str, backspaceChar);
};
String.prototype.allCasePermutations = function () {
    return allCasePermutations(this);
};
String.prototype.allUniqueAbbreviations = function () {
    return allUniqueAbbreviations(this);
};
String.prototype.allPossibleEvaluations = function () {
    return allPossibleEvaluations(this);
};
String.prototype.charactersWithMostFrequenciesFirst = function () {
    return charactersWithMostFrequenciesFirst(this);
};
String.prototype.rearrangeAvoidingCloseSameCharacters = function () {
    return rearrangeAvoidingCloseSameCharacters(this);
};
String.prototype.rearrangeBySeparatingSameCharactersAtLeastBy = function (k) {
    return rearrangeBySeparatingSameCharactersAtLeastBy(this, k);
};
module.exports = {
    allCombinationsOfBalancedBracketsPairs,
    getRowSpace,
    groupAnagrams,
    palindromePairsIndices
};
