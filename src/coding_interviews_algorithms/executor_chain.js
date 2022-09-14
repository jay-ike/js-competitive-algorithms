/*jslint
 node, this
 */

"use strict";
var Executor;
require("../utils");

/*
this class aim to implement the chain of responsibility pattern
in order to execute on function in a chain and forward it to
the next executor in case the function threw error
*/

Executor = function (func) {
    var self = Object.create(this);
    self.func = func;

    function run() {
        try {
            return self.func();
        } catch (error) {
            if (self.hasOwnProperty("child")) {
                return self.child.run();
            }
            if (!self.hasOwnProperty("child")) {
                error();
                return null;
            }
        }
    }

    self.method("run", run);
    return self;
};

Executor.fromExecutors = function (executors) {
    if (!Array.isArray(executors)) {
        throw new Error(`${executors} has to be an Array of Executors`);
    }
    return executors.reverse().reduce(function (prev, current) {
        current.child = prev;
        return current;
    });
};

module.exports = {Executor};
