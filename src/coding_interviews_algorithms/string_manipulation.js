const { buildHeap } = require("../utils");
function throwIfLongerThan(pattern, text) {
  if (pattern.length > text.length) {
    throw new ArgumentError(
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
    dictionary.decrementKeyValue(key, { deleteIfZero: false, step: 1 });
  }
  if (dictionary[key] === 0) incrementMatch();
  incrementIndex();
}
function findAnagramIndices(word, text) {
  var result = [],
    [wordLength, textLength] = [word.length, text.length];
  throwIfLongerThan(word, text);
  var frequencyMap = generateFrequencyMap(word),
    startIndex = 0,
    endIndex = 0,
    currentMatches = 0,
    expectedMatches = Object.keys(frequencyMap).reduce(
      (prev, current) => prev + frequencyMap[current],
      0
    );
  while (endIndex < textLength) {
    decrementValueIfTrue(
      endIndex - startIndex < wordLength,
      frequencyMap,
      text[endIndex],
      () => endIndex++,
      () => currentMatches++
    );
    if (currentMatches === expectedMatches) {
      result.push(startIndex);
    }
    if (endIndex - startIndex >= wordLength) {
      if (frequencyMap[text[startIndex]] === 0) currentMatches--;
      frequencyMap.incrementKeyValue(text[startIndex]);
      startIndex++;
    }
  }
  return result;
}

function generateFrequencyMap(word) {
  let map = {};
  for (character of word) {
    map.incrementKeyValue(character);
  }
  return map;
}

function palindromePairsIndices(wordList) {
  let result = [];
  let dictionary = generateIndexesDictionary(wordList);
  for (let index = 0; index < wordList.length; index++) {
    const element = wordList[index];
    for (
      let characterIndex = 0;
      characterIndex < element.length;
      characterIndex++
    ) {
      let prefix = element.slice(0, characterIndex);
      let suffix = element.slice(characterIndex);
      let reversePrefix = [...prefix].reverse().join("");
      let reverseSuffix = [...suffix].reverse().join("");
      if (dictionary.hasOwnProperty(reversePrefix) && isPalindrome(suffix)) {
        if (index !== dictionary[reversePrefix]) {
          result.push([index, dictionary[reversePrefix]]);
        }
      }
      if (dictionary.hasOwnProperty(reverseSuffix) && isPalindrome(prefix)) {
        if (index !== dictionary[reverseSuffix]) {
          result.push([dictionary[reverseSuffix], index]);
        }
      }
    }
  }
  return result;
}

function generateIndexesDictionary(wordList) {
  let dictionary = {};
  for (let index = 0; index < wordList.length; index++) {
    const element = wordList[index];
    dictionary[element] = index;
  }
  return dictionary;
}

function isPalindrome(word) {
  return word === [...word].reverse().join("");
}

function zigzagString(string, totalRows) {
  let result = "";
  if (totalRows < 2) {
    throw new Error(`${totalRows} must be greater or equal than 2`);
  }
  let stringLength = string.length;
  for (let index = 0; index < totalRows; index++) {
    let itemPosition = 0;
    let characterIndex = index;
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
        characterIndex +=
          itemPosition % 2 === 0 ? 2 * index : 2 * (totalRows - index - 1);
      }
    }
    result = `${result}\n`;
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
      itemPosition % 2 === 0 ? 2 * (totalRows - rowIndex) - 3 : 2 * rowIndex - 1
    );
  }
}

function longestPalindromeSubstring(text, separator = "#") {
  if (text.length <= 1) {
    return text;
  }
  let transformedText = `${separator}${[...text].join(
    `${separator}`
  )}${separator}`;
  let [lowerBound, upperBound] = longestPalindromeRange(transformedText);
  return text.slice(lowerBound, upperBound);
}

function longestPalindromeRange(transformedText) {
  let allRadii = Array(transformedText.length).fill(0),
    center = 0,
    radius = 0;
  let maxRadius = Number.NEGATIVE_INFINITY,
    maxRadiusIndex = 0;
  while (center < transformedText.length) {
    while (
      center - (radius + 1) >= 0 &&
      center + radius + 1 < transformedText.length &&
      transformedText[center - (radius + 1)] ===
        transformedText[center + radius + 1]
    ) {
      radius += 1;
    }
    if (maxRadius < radius) {
      maxRadius = radius;
      maxRadiusIndex = center;
    }
    allRadii[center] = radius;
    let oldCenter = center,
      oldRadius = radius;
    center += 1;
    radius = 0;
    while (center <= oldCenter + oldRadius) {
      let mirroredCenter = 2 * oldCenter - center,
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
  }
  return [
    Math.floor((maxRadiusIndex - maxRadius) / 2),
    Math.floor((maxRadiusIndex + maxRadius) / 2),
  ];
}

function groupAnagrams(list) {
  var anagramDict = {};
  var result = [];
  list.forEach(function (element) {
    var sortedLetters = [...element].sort().join("");
    if (anagramDict.hasOwnProperty(sortedLetters)) {
      anagramDict[sortedLetters].push(element);
    } else {
      anagramDict[sortedLetters] = [element];
    }
  });
  Object.getOwnPropertyNames(anagramDict).forEach((element) =>
    result.push(anagramDict[element])
  );
  return result;
}

function replaceTokens(template, valuesObject, tokenIndicator = "$") {
  let properties = Object.keys(valuesObject).filter((val) =>
    typeIsPermitted(["number", "string"], valuesObject[val])
  );
  let result = template;
  properties.forEach(function (value) {
    result = result
      .split(`${tokenIndicator}${value}`)
      .join(`${valuesObject[value]}`);
  });
  return result;
}

function typeIsPermitted(permittedTypes, value) {
  return permittedTypes.some((x) => x === typeof value);
}
function longestSubstringWithDistinctChars(input, distinctChars) {
  let charsDictionary = {},
    result = "",
    subString = "",
    start = 0,
    end = 0;
  while (end <= input.length) {
    if (
      Object.keys(charsDictionary).length < distinctChars ||
      charsDictionary[input[end]] != null
    ) {
      subString = input.slice(start, end + 1);
      charsDictionary.incrementKeyValue(input[end]);
      end++;
    } else {
      result = longestString(subString, result);
      while (Object.keys(charsDictionary).length >= distinctChars) {
        charsDictionary.decrementKeyValue(input[start]);
        start++;
      }
    }
  }
  return result.length;
}

function longestSubstringNoRepeatingChars(string) {
  var charsDictionary = {},
    result = "",
    substring = "",
    startIndex = 0,
    endIndex = 0;
  while (endIndex <= string.length) {
    if (charsDictionary[string[endIndex]] == null) {
      substring = string.slice(startIndex, endIndex + 1);
      charsDictionary.incrementKeyValue(string[endIndex]);
      endIndex++;
    } else {
      result = longestString(result, substring);
      while (charsDictionary[string[endIndex]] != null) {
        charsDictionary.decrementKeyValue(string[startIndex]);
        startIndex++;
      }
    }
  }
  return result.length;
}

function longestSubstringWithSameLettersAfterKReplacement(
  string,
  replacements
) {
  var charsDictionary = {},
    result = "",
    substring = "",
    startIndex = 0,
    toBeReplaced = 0,
    endIndex = 0;
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
      endIndex++;
      substring = string.slice(startIndex, endIndex);
    } else {
      while (toBeReplaced > replacements) {
        toBeReplaced -= removeReplacement(charsDictionary, string[startIndex]);
        charsDictionary.decrementKeyValue(string[startIndex]);
        startIndex++;
      }
    }
    result = longestString(result, substring);
  }
  return result.length;
}

function hasPermutationOf(string, pattern) {
  var startIndex = 0,
    endIndex = 0,
    charactersDictionary = {},
    patternCharacters = generateFrequencyMap(pattern);
  while (endIndex < string.length) {
    if (endIndex - startIndex < pattern.length) {
      charactersDictionary.incrementKeyValue(string[endIndex]);
      endIndex++;
    } else {
      if (
        Object.keys(charactersDictionary).every(
          (key) => charactersDictionary[key] === patternCharacters[key]
        )
      )
        return true;
      while (endIndex - startIndex >= pattern.length) {
        charactersDictionary.decrementKeyValue(string[startIndex]);
        startIndex++;
      }
    }
  }
  return Object.keys(charactersDictionary).every(
    (key) => charactersDictionary[key] === patternCharacters[key]
  );
}
function addReplacement(charsDictionary, currentChar, firstChar) {
  return charsDictionary[currentChar] == null || currentChar !== firstChar
    ? 1
    : 0;
}

function removeReplacement(charsDictionary, currentChar) {
  return charsDictionary[currentChar] == 1 ? 1 : 0;
}

function longestString(string1, string2) {
  return string1.length > string2.length ? string1 : string2;
}

function smallestSubstringContaining(text, pattern) {
  var result = "";
  throwIfLongerThan(pattern, text);
  var frequencyMap = generateFrequencyMap(pattern),
    startIndex = 0,
    endIndex = 0,
    currentMatches = 0,
    expectedMatches = Object.keys(frequencyMap).reduce(
      (prev, current) => prev + frequencyMap[current],
      0
    );
  while (endIndex < text.length) {
    decrementValueIfTrue(
      currentMatches < expectedMatches,
      frequencyMap,
      text[endIndex],
      () => endIndex++,
      () => currentMatches++
    );
    if (currentMatches === expectedMatches) {
      result = longestString(result, text.slice(startIndex, endIndex + 1));
    }
    if (
      frequencyMap[text[startIndex]] < 0 ||
      frequencyMap[text[startIndex]] == null
    ) {
      frequencyMap.incrementKeyValue(text[startIndex]);
      startIndex++;
    }
  }
  return result;
}

function concatenatedWordsIndexes(string, words) {
  var result = [],
    wordLength = words[0].length,
    wordFrequency = {},
    wordSeen = {},
    concatenatedWordsLength = words.join("").length;
  words.forEach((word) => wordFrequency.incrementKeyValue(word));
  for (
    let index = 0;
    index < string.length - concatenatedWordsLength + 1;
    index++
  ) {
    wordSeen = {};
    for (let j = 0; j < words.length; j++) {
      let nextWordIndex = index + j * wordLength;
      let word = string.slice(nextWordIndex, nextWordIndex + wordLength);
      if (wordFrequency[word] == null) break;
      wordSeen.incrementKeyValue(word);
      if (wordSeen[word] > (wordFrequency[word] || 0)) break;
      if (j + 1 === words.length) {
        result.push(index);
      }
    }
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
  let result = "",
    backspace = 0;
  for (let index = str.length - 1; index >= 0; index--) {
    if (str[index] === backspaceChar) {
      backspace++;
    } else {
      if (backspace > 0) {
        backspace--;
        continue;
      } else {
        result += str[index];
      }
    }
  }
  return result;
}
function allCasePermutations(str) {
  var permutations = [[...str].join("")];
  for (let i = 0; i < str.length; i++) {
    if (str[i].toUpperCase() !== str[i].toLowerCase()) {
      let permutationLength = permutations.length;
      for (let j = 0; j < permutationLength; j++) {
        let newPermutation = [...permutations[j]];
        if (newPermutation[i] === newPermutation[i].toUpperCase()) {
          newPermutation[i] = newPermutation[i].toLowerCase();
        } else {
          newPermutation[i] = newPermutation[i].toUpperCase();
        }
        permutations.push(newPermutation.join(""));
      }
    }
  }
  return permutations;
}
function createParenthesesBuilder(str, openedBrackets, closedBrackets) {
  return {
    str,
    openedBrackets,
    closedBrackets,
    addOpenBracket() {
      return createParenthesesBuilder(
        `${str}(`,
        openedBrackets + 1,
        closedBrackets
      );
    },
    addCloseBracket() {
      return createParenthesesBuilder(
        `${str})`,
        openedBrackets,
        closedBrackets + 1
      );
    },
  };
}
function allCombinationsOfBalancedBracketsPairs(numberOfPairs) {
  var permutations = [],
    result = [];
  permutations.push(createParenthesesBuilder("", 0, 0));
  while (permutations.length > 0) {
    let currentBrackets = permutations.shift();
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
    str,
    abbreviations,
    abbreviate() {
      return createAbbreviationBuilder(str, abbreviations + 1);
    },
    placeChar(character) {
      let newString = str;
      if (abbreviations < 1) {
        newString = `${newString}${character}`;
      } else {
        newString = `${newString}${abbreviations}${character}`;
      }
      return createAbbreviationBuilder(newString, 0);
    },
    print() {
      let result = "";
      if (abbreviations === 0) {
        result = str;
      } else {
        result = `${str}${abbreviations}`;
      }
      return result;
    },
  };
}
function allUniqueAbbreviations(str) {
  let abbreviations = [],
    result = [];
  abbreviations.push(createAbbreviationBuilder("", 0));
  for (let i = 0; i < str.length; i++) {
    let abbreviationSize = abbreviations.length;
    for (let j = 0; j < abbreviationSize; j++) {
      let currentAbbreviation = abbreviations.shift();
      abbreviations.push(
        currentAbbreviation.abbreviate(),
        currentAbbreviation.placeChar(str[i])
      );
    }
  }
  while (abbreviations.length > 0) {
    let currentAbbreviation = abbreviations.shift();
    result.push(currentAbbreviation.print());
  }
  return result;
}
function allPossibleEvaluations(str) {
  var result = [];
  if (!str.includes("+") && !str.includes("-") && !str.includes("*")) {
    result.push(Number.parseInt(str, 10));
  } else {
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (isNaN(Number.parseInt(char))) {
        let leftPart = allPossibleEvaluations(str.substring(0, i));
        let rightPart = allPossibleEvaluations(str.substring(i + 1));
        for (let j = 0; j < leftPart.length; j++) {
          let leftOperand = leftPart[j];
          for (let k = 0; k < rightPart.length; k++) {
            if (char === "+") {
              result.push(leftOperand + rightPart[k]);
            } else if (char === "-") {
              result.push(leftOperand - rightPart[k]);
            } else if (char === "*") {
              result.push(leftOperand * rightPart[k]);
            }
          }
        }
      }
    }
  }
  return result;
}
function charactersWithMostFrequenciesFirst(str) {
  var frequencies = {},
    maxHeap = buildHeap([], (a, b) => a[1] > b[1]),
    result = "";
  for (let i = 0; i < str.length; i++) {
    frequencies.incrementKeyValue(str[i]);
  }
  let keys = Object.keys(frequencies);
  keys.forEach((key) => maxHeap.push([key, frequencies[key]]));
  while (maxHeap.length() > 0) {
    let [char, frequency] = maxHeap.pop();
    result += `${char}`.repeat(frequency);
  }
  return result;
}
function rearrangeAvoidingCloseSameCharacters(str) {
  var frequencies = {},
    result = "",
    maxHeap = buildHeap([], (a, b) => a[1] > b[1]);
  for (let i = 0; i < str.length; i++) frequencies.incrementKeyValue(str[i]);
  Object.keys(frequencies).forEach((key) =>
    maxHeap.push([key, frequencies[key]])
  );
  let previousChar = null,
    previousCount = 0;
  while (maxHeap.length() > 0) {
    let [char, occurrence] = maxHeap.pop();
    if (previousChar != null && previousCount > 0) {
      maxHeap.push([previousChar, previousCount]);
    }
    previousChar = char;
    previousCount = occurrence - 1;
    result += char;
  }
  return result.length === str.length ? result : "";
}
function rearrangeBySeparatingSameCharactersAtLeastBy(str, k) {
  var maxHeap = buildHeap([], (a, b) => a[1] > b[1]),
    queue = [],
    result = "",
    frequencies = {};
  for (let i = 0; i < str.length; i++) frequencies.incrementKeyValue(str[i]);
  Object.keys(frequencies).forEach((key) =>
    maxHeap.push([key, frequencies[key]])
  );

  while (maxHeap.length() > 0) {
    let [char, occurrence] = maxHeap.pop();
    if (char != null && occurrence >= 1) {
      result += char;
      queue.push([char, occurrence - 1]);
    }
    if (queue.length === k) {
      maxHeap.push(queue.shift());
    }
  }
  return result.length === str.length ? result : "";
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
  palindromePairsIndices,
  getRowSpace,
  groupAnagrams,
  allCombinationsOfBalancedBracketsPairs,
};
