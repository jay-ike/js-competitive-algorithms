/*jslint
 node
*/

function throwNumberError(number) {
    throw new TypeError(`${number} is not a number`);
}

function throwNumberLengthError(number, maxNumber) {
    throw new Error(
        `${number} exceed ${maxNumber} digit${(
            maxNumber > 1
            ? "s"
            : ""
        )}`
    );
}
function throwTypeError(value, expectedType) {
    throw new TypeError(`${value} is not of type ${expectedType}`);
}
function numberLength(number) {
    var absoluteNumber;
    if (!(typeof(number) === "number")) {
        throwNumberError(number);
    }
    absoluteNumber = Math.abs(number);
    return (
        absoluteNumber < 1
        ? 0
        : 1 + numberLength(Math.floor(absoluteNumber / 10))
    );
}

module.exports = {
    numberLength,
    throwNumberError,
    throwNumberLengthError,
    throwTypeError
};
