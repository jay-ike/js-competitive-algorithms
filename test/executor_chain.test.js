var { assert } = require("chai");
var {
  Executor,
} = require("../src/coding_interviews_algorithms/executor_chain");

describe("executor chain test", function () {
  function printEven(value) {
    console.log(`running with ${value}`);
    if (value % 2 !== 0) {
      throw new Error(`cannot print Odd value of ${value}`);
    } else {
      return `good value of ${value}`;
    }
  }
  var executor;

  before(() => {
    executor = [1, 3, 5, 7, 8, 9, 10]
      .reverse()
      .map((value) => new Executor(() => printEven(value)))
      .reduce((prev, current) => {
        current.child = prev;
        return current;
      });
  });
  it("should return the first even value of the list", () => {
    assert.equal(executor.run(), `good value of 8`);
  });
});
