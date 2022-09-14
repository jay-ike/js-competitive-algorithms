/*jslint
 node
 */
/*global describe, before, it */

"use strict";
const {assert} = require("chai");
const LcdDisplay = require("../src/coding_interviews_algorithms/lcd_display");

describe("testing the lcd display", function () {
    var lcdDisplay;
    var firstResult;
    before(function () {
        lcdDisplay = new LcdDisplay();
    });

    describe("lcd display for on bar strings", function () {
        var vertical = " ".repeat(2) + "|\n";
        var horizontal = " ".repeat(4);
        var display;
        firstResult = (
            horizontal +
            "\n" +
            vertical +
            horizontal +
            "\n" +
            vertical +
            horizontal
        );
        it("should display the value of 123 in lcd style", function () {
            display = lcdDisplay.display(1, 1);
            console.log(display);
            assert.equal(display, firstResult);
        });
        it(
            "should throw exception if not given a number as input",
            function () {
                assert.throws(
                    () => lcdDisplay.display("new test", 2),
                    "new test is not a Number"
                );
            }
        );

    });

});
