
// this function group anagrams in a list of items
function groupAnagrams(list) {
    var anagramDict = {}
    var result = [];
    list.forEach(function (element) {
        var sortedLetters = [...element].sort().join('');
        if (anagramDict.hasOwnProperty(sortedLetters)) {
            anagramDict[sortedLetters].push(element);
        } else {
            anagramDict[sortedLetters] = [element];
        }
    });
    Object.getOwnPropertyNames(anagramDict).forEach((element) => result.push(anagramDict[element]));
    return result;

}

module.exports = { groupAnagrams };