const { longestIncreasingSubsequence,
    Salary,
    arrayGenerator,
    salaryComparatorCallback
    , } =
    require('../src/coding_interviews_algorithms/longest_increasing_subsequence');

const { it } = require('mocha');
const { assert } = require('chai');

describe('longestIncreasing subsequence test', function () {
    var inputs,expected,salaries;


    before(function () {
        inputs = [3, 1, 4, 1, 5, 9, 2, 6, 5, 4];
        expected = [1, 4, 5, 6];
        salaries = inputs.map((el) => new Salary('my_test', 1000 * el));
        // salaries = arrayGenerator(inputs, (index) => new Salary('my_test', 1000 * inputs[index]));
    });

        it('should return the expected list', function () {
            var result = longestIncreasingSubsequence(inputs);
            assert.deepEqual(result, expected);
        });
        
    it('should return the longest increasing salaries subsequence', function () {
        var result = longestIncreasingSubsequence(salaries, salaryComparatorCallback);
        var expectedSalaries = expected.map((el) => new Salary('my_test', 1000 * el));
        assert.deepEqual(result, expectedSalaries);
    })
    

});