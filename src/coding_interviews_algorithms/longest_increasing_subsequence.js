

// compute the longest increasing subsequence algorithm 
// if provided the comparatorCallback will be use to make the comparison between elements
function longestIncreasingSubsequence(array) {
    //ToDo: adapt it for any type of object
    let heads = [undefined], longestSubsequence = [-Infinity];
    let predecessors = arrayGenerator(array.length, (index) => undefined);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element > longestSubsequence[longestSubsequence.length - 1]) {
            predecessors[index] = heads[heads.length - 1];
            heads.push(index);
            longestSubsequence.push(element);

        } else {
            let position = positionInSortedArray(longestSubsequence, element);
            heads[position] = index;
            predecessors[index] = heads[position - 1];
            longestSubsequence[position] = element
        }
        
    }
    let sequenceItemIndex = heads[heads.length - 1], result = [];
    while (sequenceItemIndex !== undefined) {
        result.push(array[sequenceItemIndex]);
        sequenceItemIndex = predecessors[sequenceItemIndex]
    }
    return result.reverse();

}

function positionInSortedArray(array, element,comparatorCallback) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        let mid = left+((right - left) >> 1);
        if (array[mid] === element) {
            return mid;
        }
        if (array[mid] < element  ) {
            left = mid+1;
        } else {
            right = mid;
        }
    }
    return right;
}

defaultComparator = (elt1, elt2) => elt1 < elt2?-1:1;

function arrayGenerator(items, creationCallback) {
    let result = Array(items);
    for (let index = 0; index < result.length; index++) {
        result[index] = creationCallback(index);
        
    }
    return result;
}

class Salary{
    name
    amount
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }

    compareTo(other) {
        if (typeof (other) != typeof(this)) {
            throw new Error('cannot compare with different object');
        } else {
            return amount < other.amount ? -1 : 1;
        }    
    }
}

salaryComparatorCallback = (salary1, salary2) => salary1.compareTo(salary2);

module.exports ={ longestIncreasingSubsequence,Salary,salaryComparatorCallback,arrayGenerator };