/*jslint
 this, node
*/

"use strict";
const {throwIfNaN} = require("../utils");
var LcdDisplay;

var LineSetBuilder = function () {
    var self = Object.create(this);
    var linesMap;
    var firstLineSet = new Set(Array.generate(10)).exclude(new Set([1, 4]));
    var secondLineSet;
    var thirdLineSet = new Set(Array.generate(10)).exclude(new Set([0, 1, 7]));
    var fourthLineSet;
    var fifthLineSet = new Set(Array.generate(10)).exclude(new Set([1, 7]));
    secondLineSet = {
        "withBothBarSet": new Set([0, 4, 8, 9]),
        "withLeftBarSet": new Set([5, 6]),
        "withRightBarSet": new Set([1, 2, 3, 7])
    };
    fourthLineSet = {
        "withBothBarSet": new Set([0, 6, 8]),
        "withLeftBarSet": new Set([2]),
        "withRightBarSet": new Set([1, 3, 4, 5, 7, 9])
    };
    linesMap = {
        "1": firstLineSet,
        "2": secondLineSet,
        "3": thirdLineSet,
        "4": fourthLineSet,
        "5": fifthLineSet
    };

    function linesIndexMap() {
        return linesMap;
    }
    self.method("linesIndexMap", linesIndexMap);
    return self;
};

LcdDisplay = function () {
    var self = Object.create(this);
    var linesIndexMap = new LineSetBuilder().linesIndexMap();

    function display(number, characterSize) {
        var result = "";
        throwIfNaN(number);
        Object.keys(linesIndexMap).forEach(function (key) {
            result += `${computeLinePrinting(
                number,
                characterSize,
                Number.parseInt(key),
                10
            )}`;
        });
        return result;
    }

    function computeLinePrinting(number, characterSize, lineIndex) {
        var intPartResult = "";
        var decimalPartResult = "";
        var index;
        var result = "";
        var parts = `${Number.parseFloat(number)}`;
        var digit;
        parts = parts.split(".");
        index = 0;
        while (index < parts[0].length) {
            digit = Number.parseInt(parts[0][index], 10);
            intPartResult += (
                lineIndex % 2 === 0
                ? computeVerticalPrinting(
                    digit,
                    characterSize,
                    linesIndexMap[lineIndex]
                )
                : computeHorizontalPrinting(
                    digit,
                    characterSize,
                    linesIndexMap[lineIndex]
                )
            );
            index += 1;
        }
        index = 0;
        parts[1] = parts[1] ?? "";
        while (index < parts[1].length) {
            digit = Number.parseInt(parts[1][index], 10);
            decimalPartResult += (
                lineIndex % 2 === 0
                ? computeVerticalPrinting(
                    digit,
                    characterSize,
                    linesIndexMap[lineIndex]
                )
                : computeHorizontalPrinting(
                    digit,
                    characterSize,
                    linesIndexMap[lineIndex]
                )
            );
            index += 1;
        }
        if (lineIndex % 2 === 0) {
            decimalPartResult = fallback(
                decimalPartResult,
                "",
                "",
                ` ${decimalPartResult}`
            );
            result = `${intPartResult}${decimalPartResult}\n`;
            result = result.repeat(characterSize);
        } else if (lineIndex === 5) {
            decimalPartResult = fallback(
                decimalPartResult,
                "",
                "",
                `.${decimalPartResult}`
            );
            result = ` ${intPartResult}${decimalPartResult}`;
        } else {
            decimalPartResult = fallback(
                decimalPartResult,
                "",
                "",
                ` ${decimalPartResult}`
            );
            result = ` ${intPartResult}${decimalPartResult}\n`;
        }
        return result;
    }
    function fallback(value, invalid, valueOnInvalid, replacement) {
        return (
            value === invalid
            ? valueOnInvalid
            : replacement
        );
    }
    function computeHorizontalPrinting(digit, characterSize, printableSet) {
        return (
            printableSet.has(digit)
            ? `${"-".repeat(characterSize)}`
            : " ".repeat(characterSize + 2)
        );
    }

    function computeVerticalPrinting(digit, characterSize, printConfiguration) {
        var result = "";
        if (printConfiguration.withLeftBarSet.has(digit)) {
            result = printVerticalSegment(characterSize, true, false);
        }
        if (printConfiguration.withRightBarSet.has(digit)) {
            result = printVerticalSegment(characterSize, false, true);
        }
        if (printConfiguration.withBothBarSet.has(digit)) {
            result = printVerticalSegment(characterSize, true, true);
        }
        return result;
    }

    function printVerticalSegment(characterSize, hasLeftBar, hasRightBar) {
        var result = "";
        if (hasLeftBar && hasRightBar) {
            result = `|${" ".repeat(characterSize)}|`;
        } else if (hasLeftBar) {
            result = `|${" ".repeat(characterSize + 1)}`;
        } else if (hasRightBar) {
            result = `${" ".repeat(characterSize + 1)}|`;
        }
        return result;
    }
    self.method("display", display);
    return self;
};

module.exports = LcdDisplay;
