/*jslint
 node
 */
/*global
 describe, before, it
 */

"use strict";
const {
    Executor
} = require("../src/coding_interviews_algorithms/executor_chain");
const {assert} = require("chai");
describe("executor chain test", function () {
    var executor;
    function printEven(value) {
        if (value % 2 !== 0) {
            throw new Error(`cannot print Odd value of ${value}`);
        } else {
            return `good value of ${value}`;
        }
    }

    before(function () {
        executor = Executor.fromExecutors([1, 3, 5, 7, 8, 9, 10].map(
            function (value) {
                return new Executor(() => printEven(value));
            }
        ));
    });
    it("should return the first even value of the list", function () {
        assert.equal(executor.run(), `good value of 8`);
    });
});
