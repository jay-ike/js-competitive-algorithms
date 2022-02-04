require("../utils");
function findAnagramIndices(word, text) {
  var result = [];
  var [wordLength, textLength] = [word.length, text.length];
  if (wordLength > textLength) {
    throw new Error(
      `${word} length should be lesser or equal to ${text} length`
    );
  }
  var frequencyMap = generateFrequencyMap(word);
  for (let i = 0; i < wordLength; i++) {
    frequencyMap.decrementKeyValue(text[i]);
  }
  if (Object.keys(frequencyMap).length === 0) {
    result.push(0);
  }
  for (let i = wordLength; i < textLength; i++) {
    let [startIndex, endIndex] = [i - wordLength, i];
    frequencyMap.incrementKeyValue(text[startIndex]);
    frequencyMap.deleteIfZero(text[startIndex]);

    frequencyMap.decrementKeyValue(text[endIndex]);
    if (Object.keys(frequencyMap).length === 0) {
      result.push(i - wordLength + 1);
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

function deleteIfZero(dictionary, key) {
  if (dictionary[key] === 0) {
    delete dictionary[key];
  }
}
function decrementKeyValue(dictionary, key, step = 1) {
  if (dictionary[key] === step) {
    dictionary[key] = (dictionary[key] ?? 0) - step;
    deleteIfZero(dictionary, key);
  } else {
    dictionary[key] = (dictionary[key] ?? 0) - step;
  }
}
function incrementKeyValue(dictionary, key, step = 1) {
  dictionary[key] = (dictionary[key] ?? 0) + step;
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

function longestPalindromeSubstring(text) {
  let forbiddenTokens = ["#", "^", "$"];
  let center = 1,
    maxDiameter = 1;
  let transformedText = `^#${[...text].join("#")}#$`;
  let allRadii = Array.from(Array(transformedText.length), (_) => 0);
  let maxRadiusIndex = 2;
  throwIfContains(forbiddenTokens, text);
  if (text === "") {
    return text;
  }
  for (let index = 2; index < transformedText.length - 1; index++) {
    let mirror = 2 * center - index;
    allRadii[index] = Math.max(
      0,
      Math.min(maxDiameter - index, allRadii[mirror])
    );
    while (
      transformedText[index - (allRadii[index] + 1)] ===
      transformedText[index + allRadii[index] + 1]
    ) {
      allRadii[index] += 1;
    }
    if (index + allRadii[index] > maxDiameter) {
      center = index;
      maxDiameter = index + allRadii[index];
    }
    if (allRadii[index] > allRadii[maxRadiusIndex]) {
      maxRadiusIndex = index;
    }
  }
  let lowerBound = Math.floor((maxRadiusIndex - allRadii[maxRadiusIndex]) / 2);
  let upperBound = Math.floor((maxRadiusIndex + allRadii[maxRadiusIndex]) / 2);
  return text.slice(lowerBound, upperBound);
}

function throwIfContains(tokens, text) {
  let textCharacters = new Set([...text]);
  let hasNoToken = tokens
    .map((e) => textCharacters.has(e))
    .every((e) => e === false);
  if (!hasNoToken) {
    throw new Error("should not have forbidden token in text");
  }
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
      typeof charsDictionary[input[end]] !== "undefined"
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

function longestString(string1, string2) {
  return string1.length > string2.length ? string1 : string2;
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
module.exports = {
  generateFrequencyMap,
  findAnagramIndices,
  isPalindrome,
  generateIndexesDictionary,
  palindromePairsIndices,
  getRowSpace,
  zigzagString,
  throwIfContains,
  longestPalindromeSubstring,
  groupAnagrams,
  replaceTokens,
};
