class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  appendNode(node) {
    var moves = 0;
    if (typeof node !== typeof this) return;
    if (this.next) {
      moves++;
      this.next.appendNode(node);
    } else {
      this.next = node;
    }
    return moves;
  }
  makeNMoves(n) {
    let index = 0,
      child = this;
    if (n === 0) return child;
    while (index < n) {
      index++;
      if (child.next) {
        child = child.next;
      } else {
        return null;
      }
    }
    return child;
  }
  equals(node) {
    let pointer1 = this,
      pointer2 = node;
    while (pointer1 !== null && pointer2 !== null) {
      if (pointer1.value !== pointer2.value) return false;
      pointer1 = pointer1.next;
      pointer2 = pointer2.next;
    }
    if (pointer1 !== null || pointer2 !== null) return false;
    return true;
  }
}
function squareDigitsSum(number) {
  let digit = 0,
    result = 0,
    copyNumber = number;
  while (copyNumber > 0) {
    digit = copyNumber % 10;
    result += digit ** 2;
    copyNumber = Math.floor(copyNumber / 10);
  }
  return result;
}
Number.prototype.intPart = function () {
  return this.toFixed();
};

Number.prototype.squareDigitsSum = function () {
  return squareDigitsSum(this);
};

Set.prototype.exclude = function (otherSet) {
  var set = new Set(this);
  for (const iterator of otherSet) {
    set.delete(iterator);
  }
  return set;
};

Set.prototype.union = function (otherSet) {
  var set = new Set(this);
  for (const iterator of otherSet) {
    set.add(iterator);
  }
  return set;
};

Set.prototype.intersectWith = function (otherSet) {
  var currentSize = this.size,
    otherSetSize = otherSet.size;
  var lesserSet, biggerSet;
  if (currentSize > otherSetSize) {
    lesserSet = otherSet;
    biggerSet = new Set(this);
  } else {
    lesserSet = new Set(this);
    biggerSet = otherSet;
  }
  for (const iterator of lesserSet) {
    if (!biggerSet.has(iterator)) {
      lesserSet.delete(iterator);
    }
  }
  return lesserSet;
};

function generateArray(length, builder) {
  result = [];
  for (let index = 0; index < length; index++) {
    result.push(builder === undefined ? index : builder(index));
  }
  return result;
}

function throwIfNaN(number) {
  if (typeof number !== "number") {
    throw Error(`${number} is not a Number`);
  }
}
function deleteIfZero(dictionary, key) {
  if (dictionary[key] === 0) {
    delete dictionary[key];
  }
}
function decrementKeyValue(dictionary, key, { step, deleteIfZero }) {
  let defaultStep = step ?? 1;
  if (dictionary[key] == null) return;
  if (dictionary[key] === defaultStep && deleteIfZero) {
    delete dictionary[key];
  } else {
    dictionary[key] = (dictionary[key] ?? 0) - defaultStep;
  }
}
function incrementKeyValue(dictionary, key, { step, condition }) {
  if (condition ?? true) {
    dictionary[key] = (dictionary[key] ?? 0) + (step ?? 1);
  }
}
Object.prototype.incrementKeyValue = function (
  key,
  { step, condition } = { step: 1, condition: true }
) {
  incrementKeyValue(this, key, { step, condition });
};
Object.prototype.decrementKeyValue = function (
  key,
  { step, deleteIfZero } = { step: 1, deleteIfZero: true }
) {
  decrementKeyValue(this, key, { step, deleteIfZero });
};
Object.prototype.deleteIfZero = function (key) {
  deleteIfZero(this, key);
};
module.exports = { generateArray, throwIfNaN, Node };
