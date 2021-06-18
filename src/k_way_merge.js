
function mergeSortedLists(sortedLists) {
    if (sortedLists.length <= 0) {
        throw Error("cannot merge Empty Lists");
    }
    if (sortedLists.length == 1) {
        return sortedLists[0];
    } else if (sortedLists.length == 2) {
        return mergeTwoArrays(sortedLists[0],sortedLists[1])
    } else {
        let halfListIndex = sortedLists.length >> 1;
        return mergeTwoArrays( mergeSortedLists(sortedLists.slice(0,halfListIndex)), mergeSortedLists(sortedLists.slice(halfListIndex)))
        
    }
}

function mergeTwoArrays(firstArray, secondArray) {
    let smallest, greatest;
    let result = [];
    if (firstArray.length <= 0 || secondArray.length <= 0) {
        throw Error("cannot merge empty arrays");
    }
    if (firstArray[0] > secondArray[0]) {
        smallest = secondArray;
        greatest = firstArray;
    } else {
        greatest = secondArray
        smallest = firstArray
    }
    result.push(smallest[0])
    for (var i = 0; i < greatest.length; i++){
        insertInTheHeap(smallest, greatest[i], result);
    }
    for (var i = 1; i < smallest.length; i++){
        insertInTheHeap(smallest, Infinity, result);
    }
    return result;
}

function insertInTheHeap(heap, element, output) {
    heap[0] = element;
    checkMinHeapStructure(heap, 0);
    output.push(heap[0]);
}

function checkMinHeapStructure(List, index) {
    let smallest=index, left = leftNode(index), right = rightNode(index);
    
    if (index <= List.length &&  List[index] > List[left]) {
        smallest = left
    }
    if (index <= List.length && List[smallest] > List[right]) {
        smallest = right;
    }
    if (smallest!== index) {
        [List[index], List[smallest]] = [List[smallest], List[index]];
        checkMinHeapStructure(List, smallest);
    }

}
function leftNode(index) {
    return 2 * index + 1;
}

function rightNode(index) {
    return 2 * (index + 1);
}

module.exports = mergeSortedLists;