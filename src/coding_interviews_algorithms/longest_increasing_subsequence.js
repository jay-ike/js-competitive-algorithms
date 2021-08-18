

// compute the longest increasing subsequence algorithm 
// if provided the comparatorCallback will be use to make the comparison between elements
function longestIncreasingSubsequence(array,comparatorCallback) {
    let heads = [undefined], longestSubsequence = [-Infinity];
    let predecessors = arrayGenerator(array.length, (index) => undefined);
    let callback = (comparatorCallback ?? defaultComparator);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (callback(element,  longestSubsequence[longestSubsequence.length - 1])>0) {
            predecessors[index] = heads[heads.length - 1];
            heads.push(index);
            longestSubsequence.push(element);

        } else {
            let position = positionInSortedArray(longestSubsequence, element,callback);
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
        if ((comparatorCallback??defaultComparator)( array[mid] , element) <0  ) {
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
        return this.amount < (other.hasOwnProperty('amount')? other.amount:other)?-1:1    
    }
}

salaryComparatorCallback = (salary1, salary2) => (salary1.hasOwnProperty('amount') ? salary1.amount : salary1) <
    (salary2.hasOwnProperty('amount') ? salary2.amount : salary2) ? -1 : 1;

module.exports ={ longestIncreasingSubsequence,Salary,salaryComparatorCallback,arrayGenerator };