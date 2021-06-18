const { it } = require('mocha')
const { assert } = require('chai');
const { generateArray } = require('../src/utils')
describe('utility functions testing', function () {
    var numberObj
    before(function () {
        numberObj = 85.235
        initialSet = new Set([1,2,4])
    })
    it('should return the integerPart of the number', function () {
        assert.equal(numberObj.intPart(),85) 
    });
    it('should return the initialSet excluding [1,4]', function () {
        result = initialSet.exclude(new Set([1, 4]))
        assert.deepEqual(result , new Set([2]));
    });
    it('should return the union of initialSet with [1,5,8,9]', function () {
        result = initialSet.union(new Set([1, 5, 8, 9]))
        assert.deepEqual(result,new Set([1,2,4,5,8,9]))
    });
    
    it('should return the intersection of initialSet with [1,2,5,8,9]', function () {
        result = initialSet.intersectWith(new Set([1, 2, 5, 8, 9]))
       assert.deepEqual(result,new Set([1,2])) 
    });

    it('should generate the an array of number from 1 to 10', function () {
        result = generateArray(10, (i) => i + 1)
        assert.deepEqual(result,[1,2,3,4,5,6,7,8,9,10])
    });

    it('should return number from 0 to 9 excluding 1 and 4', function () {
        result = new Set(generateArray(10)).exclude(new Set([1, 4]));
        assert.deepEqual(result,new Set([0,2,3,5,6,7,8,9]))
     });
});