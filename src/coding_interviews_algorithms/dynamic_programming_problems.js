
function maximumProfitFittingCapacity(profits, weights, capacity) {
    var n = profits.length, dp = Array(capacity + 1).fill(0)
    if(capacity<=0||n===0||weights.length !== n) return 0
    for (let i = 0; i <= capacity; i++){
        if(weights[0]<=i) dp[i]=profits[0]
    }
    for (let i = 1; i < n; i++){
        for (let c = capacity; c >= 0; c--){
            let profit2=0,profit1=0
            if (weights[i] <= c) profit1 = profits[i]+dp[c-weights[i]]
            profit2 = dp[c]
            dp[c]=Math.max(profit1,profit2)
        }
    }
    return dp[capacity]
}

function hasTwoPartitionsOfEqualSum(array) {
    let sum = array.reduce((prev, current) => current + prev, 0), length = array.length
    if(sum%2!==0) return false
    sum /=2
    dp =  Array(sum+1).fill(false)
    dp[0] = true
    for (let i = 1; i <= sum; i++) dp[i] = array[0] === i
    for (let i = 1; i < length; i++){
        for (let j = sum; j>=0; j--){
            if (!dp[j] && j >= array[i]) dp[j] = dp[j-array[i]]
        }
    }
    return dp[sum]
}
function hasSubsetWithSum(array, sum) {
    if (array.length === 0) return false
    let length = array.length
    dp = Array(sum + 1).fill(false)
    dp[0]=true
    for (let i = 1; i <= sum;i++) dp[i] = array[0]===i
    for (let i = 1; i < length; i++){
        for (let j = sum; j >=0; j--){
            if (!dp[j] && j>=array[i]) dp[j] = dp[j-array[i]]
        }
    }
    return dp[sum]
}
function minimumDifferenceBetweenTwoSubSetSum(array){
    let sum = array.reduce((prev, current) => prev + current, 0),
    halfSum = Math.floor(sum/2)
    dp = Array(halfSum + 1).fill(false)
    dp[0] = true
    for (let i = 1; i < halfSum;i++) dp[i] = array[0] === i
    for (let i = 1; i < array.length; i++){
        for (let j = halfSum; j >= 0; j--){
            if(!dp[j] && j>=array[i]) dp[j]=dp[j-array[i]]
        }
    }
    let index = halfSum
    while (!dp[index]) {
        index--
    }
    return Math.abs(2*index-sum)
}
function countOfSubsetWithSum(array, sum) {
    var dp = Array(sum + 1).fill(0), arraySum = array.reduce((prev, current) => prev + current, 0)
    if(sum>arraySum) return 0
    dp[0] = 1
    for (let i = 1; i <= sum; i++) dp[i] = array[0] === i ? 1 : 0
    for (let i = 1; i < array.length; i++){
        for (let j = sum; j  >=0; j--){
            if (j >= array[i]) dp[j] = dp[j] + dp[j - array[i]]
        }
    }
    return dp[sum]
}
function numberOfSymbolsCombinationToHaveTheSum(array, sum) {
    var arraySum = array.reduce((prev, current) => prev + current, 0)
    if (sum > arraySum || (sum + arraySum) % 2 === 1) return 0;
    sum = (sum + arraySum)/2
    let dp = Array(sum + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= sum; i++) dp[i] = array[0] === i ? 1 : 0
    for (let i = 1; i < array.length; i++){
        for (let j = sum; j >= 0; j--){
            if(j>=array[i]) dp[j] += dp[j-array[i]]
        }
    }
    return dp[sum]
}
Array.prototype.hasTwoPartitionsOfEqualSum = function () {
    return hasTwoPartitionsOfEqualSum(this)
}
Array.prototype.hasSubsetWithSum = function (sum) {
    return hasSubsetWithSum(this,sum)
}
Array.prototype.minimumDifferenceBetweenTwoSubSetSum = function () {
    return minimumDifferenceBetweenTwoSubSetSum(this)
}
Array.prototype.countOfSubsetWithSum = function (sum) {
    return countOfSubsetWithSum(this,sum)
}
Array.prototype.numberOfSymbolsCombinationToHaveTheSum = function (sum) {
    return numberOfSymbolsCombinationToHaveTheSum(this,sum)
}
module.exports = {
    maximumProfitFittingCapacity
}