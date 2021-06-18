Number.prototype.intPart = function () {
    return this.toFixed()
}

Set.prototype.exclude = function (otherSet) {
    var set = new Set(this)
    for (const iterator of otherSet) {
        set.delete(iterator)
    }
    return set
}

Set.prototype.union = function (otherSet) {
    var set = new Set(this)
    for (const iterator of otherSet) {
        set.add(iterator)
    }
    return set
}

Set.prototype.intersectWith = function (otherSet) {
    var currentSize = this.size, otherSetSize = otherSet.size
    var lesserSet,biggerSet
    if (currentSize > otherSetSize) {
        lesserSet = otherSet
        biggerSet = new Set(this)
    } else {
        lesserSet = new Set(this)
        biggerSet = otherSet
    }
    for (const iterator of lesserSet) {
        if (!biggerSet.has(iterator)) {
            lesserSet.delete(iterator)
        }
    }
    return lesserSet

    
}

function generateArray(length, builder) {
    result = []
    for (let index = 0; index < length; index++) {
        result.push(builder === undefined ? index: builder(index))
    }
    return result
}

function throwIfNaN(number) {
    if (typeof number !== 'number') {
        throw Error(`${number} is not a Number`)
    }
}

module.exports = { generateArray,throwIfNaN}