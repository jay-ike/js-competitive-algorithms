/*jslint
 node
 */

"use strict";
require("../utils");

function directedGraphTopologicalOrder(
    adjacencyList,
    source,
    inDegree,
    maxSourcePerIteration = Number.MAX_SAFE_INTEGER,
    equalityCheck = null
) {
    var sortedOrder = [];
    var root;
    while (source.length > 0) {
        if (source.length > maxSourcePerIteration) {
            break;
        }
        root = source.shift();
        sortedOrder.push(root);
        if (
            typeof equalityCheck === "function" &&
            equalityCheck(sortedOrder) === false
        ) {
            break;
        }
        adjacencyList[root].forEach(function (child) {
            inDegree.decrementKeyValue(child, {deleteIfZero: false, step: 1});
            if (inDegree[child] === 0) {
                source.push(child);
            }
        });
    }
    return sortedOrder;
}
function directedGraphDetailsFromEdges(edges) {
    var inDegree = {};
    var adjacency = {};
    var parent;
    var child;
    edges.forEach(function (edge) {
        parent = edge[0];
        child = edge[1];
        if (Object.isNull(adjacency[parent])) {
            adjacency[parent] = [child];
        } else {
            adjacency[parent].push(child);
        }
        if (Object.isNull(adjacency[child])) {
            adjacency[child] = [];
        }
        if (Object.isNull(inDegree[parent])) {
            inDegree[parent] = 0;
        }
        inDegree.incrementKeyValue(child);
    });
    return [inDegree, adjacency];
}
function topologicalSort(edges) {
    var details = directedGraphDetailsFromEdges(edges);
    var inDegree = details[0];
    var adjacency = details[1];
    var source = Object.keys(
        inDegree
    ).filter(
        (key) => inDegree[key] === 0
    ).map(
        (key) => Number.parseInt(key)
    );
    return directedGraphTopologicalOrder(adjacency, source, inDegree);
}
function scheduleTaskWithPrerequisites(prerequisites) {
    var sortedOrder;
    var source = [];
    var details = directedGraphDetailsFromEdges(prerequisites);
    source = Object.keys(
        details[0]
    ).filter(
        (key) => details[0][key] === 0
    ).map((key) => Number.parseInt(key));
    sortedOrder = directedGraphTopologicalOrder(
        details[1],
        source,
        details[0]
    );
    return [sortedOrder, Object.keys(details[0]).length];
}
function canBeScheduled(prerequisites) {
    var schedule = scheduleTaskWithPrerequisites(prerequisites);
    return schedule[0].length === schedule[1];
}
function schedulingOrderToFinishTasks(prerequisites) {
    var schedule = scheduleTaskWithPrerequisites(prerequisites);
    return (
        schedule[0].length === schedule[1]
        ? schedule[0]
        : []
    );
}
function allPossibleScheduling(prerequisites) {
    var details = directedGraphDetailsFromEdges(prerequisites);
    var result = [];
    var source = Object.keys(
        details[0]
    ).filter(
        (key) => details[0][key] === 0
    ).map((key) => Number.parseInt(key));
    recursiveTopologicalSort(
        source,
        details[0],
        details[1],
        [],
        (order) => result.push(order)
    );
    return result;
}
function recursiveTopologicalSort(
    source,
    inDegree,
    adjacencyList,
    sortedOrder,
    onOrderFound
) {
    var i;
    var node;
    var nextSource;
    var j;
    if (source.length > 0) {
        i = 0;
        while (i < source.length) {
            node = source[i];
            sortedOrder.push(node);
            nextSource = [...source];
            nextSource.splice(i, 1);
            adjacencyList[node].forEach(function (child) {
                inDegree.decrementKeyValue(child, {
                    deleteIfZero: false,
                    step: 1
                });
                if (inDegree[child] === 0) {
                    nextSource.push(child);
                }
            });
            recursiveTopologicalSort(
                nextSource,
                inDegree,
                adjacencyList,
                sortedOrder,
                onOrderFound
            );
            sortedOrder.pop();
            j = 0;
            while (j < adjacencyList[node].length) {
                inDegree.incrementKeyValue(adjacencyList[node][j]);
                j += 1;
            }
            i += 1;
        }
    }
    if (sortedOrder.length === Object.keys(inDegree).length) {
        onOrderFound([...sortedOrder]);
    }
}
function characterOrderGivenSortedWords(words) {
    var orders;
    var i = 1;
    var j;
    var minLength;
    var prevWordChar;
    var currentWordChar;
    var key;
    var source;
    if (words.length <= 1) {
        return [];
    }
    orders = {};
    while (i < words.length) {
        minLength = Math.min(words[i].length, words[i - 1].length);
        j = 0;
        while (j < minLength) {
            prevWordChar = words[i - 1][j];
            currentWordChar = words[i][j];
            key = `${prevWordChar}${currentWordChar}`;
            if (prevWordChar !== currentWordChar) {
                if (Object.isNull(orders[key])) {
                    orders[key] = [prevWordChar, currentWordChar];
                }
                break;
            }
            j += 1;
        }
        i += 1;
    }
    i = directedGraphDetailsFromEdges(
        Object.values(orders)
    );
    source = Object.keys(i[0]).filter((key) => i[0][key] === 0);
    orders = directedGraphTopologicalOrder(i[1], source, i[0]);
    return (
        orders.length === Object.keys(i[0]).length
        ? orders
        : []
    );
}
function canReconstructOriginalSequenceFromSequences(
    originalSequence,
    sequences
) {
    var dependencies = [];
    var i = 0;
    var j;
    var order;
    while (i < sequences.length) {
        if (sequences[i].length === 2) {
            dependencies.push(sequences[i]);
        } else if (sequences[i].length > 2) {
            j = 1;
            while (j < sequences[i].length) {
                dependencies.push([sequences[i][j - 1], sequences[i][j]]);
                j += 1;
            }
        }
        i += 1;
    }
    i = directedGraphDetailsFromEdges(dependencies);
    j = Object.keys(
        i[0]
    ).filter(
        (key) => i[0][key] === 0
    ).map(Number.parseInt);
    order = directedGraphTopologicalOrder(
        i[1],
        j,
        i[0],
        1,
        function (sortedOrder) {
            var lastIndex = sortedOrder.length - 1;
            return originalSequence[lastIndex] === sortedOrder[lastIndex];
        }
    );
    return order.length === originalSequence.length;
}
function allRootsForMinimumHeightTrees(edges) {
    var adjacencies = {};
    var inDegree = {};
    var leaves = [];
    var i = 0;
    var node;
    var leaveSize;
    while (i < edges.length) {
        leaves = edges[i];
        if (Object.isNull(adjacencies[leaves[0]])) {
            adjacencies[leaves[0]] = [leaves[1]];
        } else {
            adjacencies[leaves[0]].push(leaves[1]);
        }
        if (Object.isNull(adjacencies[leaves[1]])) {
            adjacencies[leaves[1]] = [leaves[0]];
        } else {
            adjacencies[leaves[1]].push(leaves[0]);
        }
        inDegree.incrementKeyValue(leaves[0]);
        inDegree.incrementKeyValue(leaves[1]);
        i += 1;
    }
    leaves = Object.keys(
        inDegree
    ).map((key) => Number.parseInt(key)).filter((key) => inDegree[key] === 1);
    while (Object.keys(inDegree).length > 2) {
        leaveSize = leaves.length;
        i = 0;
        while (i < leaveSize) {
            node = leaves.shift();
            inDegree.decrementKeyValue(node, {deleteIfZero: true, step: 1});
            adjacencies[node].forEach(function (key) {
                inDegree.decrementKeyValue(key, {deleteIfZero: true, step: 1});
                if (inDegree[key] === 1) {
                    leaves.push(key);
                }
            });
            i += 1;
        }
    }
    return leaves;
}
module.exports = {
    allPossibleScheduling,
    allRootsForMinimumHeightTrees,
    canBeScheduled,
    canReconstructOriginalSequenceFromSequences,
    characterOrderGivenSortedWords,
    schedulingOrderToFinishTasks,
    topologicalSort
};
