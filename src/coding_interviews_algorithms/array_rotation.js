function rotateArray(arr, pivot) {
  var modulusPivot = 0;
  if (pivot > 0) {
    modulusPivot = pivot % arr.length;
  } else if (pivot < 0) {
    modulusPivot = arr.length + (pivot % arr.length);
  }
  return [...arr.slice(modulusPivot), ...arr.slice(0, modulusPivot)];
}

module.exports = { rotateArray };
