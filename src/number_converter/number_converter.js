/*jslint
  node, this
  */
"use strict";

require("../utils");
const {numberLength, throwNumberLengthError} = require("./number_helper");


var DigitConverter = function () {
    var self = Object.create(this);
    var digitDictionary = {
        "0": "zero",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine"
    };

    function convert(digit) {
        var length = numberLength(digit);
        var absoluteNumber;
        if (length > 1) {
            throwNumberLengthError(digit, 1);
        }
        absoluteNumber = Math.abs(digit);
        return digitDictionary[absoluteNumber];
    }

    self.method("convert", convert);
    return self;
};

var TensConverter = function (numberConverter) {
    var self = Object.create(this);
    var converter = numberConverter;
    var tensSpecial = {
        "0": "ten",
        "1": "eleven",
        "2": "twelve",
        "3": "thirteen"
    };
    var specialFirstDigit = {
        "2": "twenty",
        "3": "thirty",
        "5": "fifty",
        "8": "eighty"
    };

    function convertTwoDigitNumber(firstDigit, secondDigit) {
        var digitConversion;
        var tensConversion;
        if (firstDigit === 1) {
            return convert1xNumber(secondDigit);
        } else {
            tensConversion = convertFirstDigit(firstDigit);
            digitConversion = converter.convertDigit(secondDigit);
            return `${tensConversion} ${digitConversion}`;
        }
    }

    function convert1xNumber(x) {
        return tensSpecial[x] ?? `${converter.convertDigit(x)}teen`;

    }

    function convertFirstDigit(firstDigit) {
        var digitConversion = converter.convertDigit(firstDigit);
        return specialFirstDigit[firstDigit] ?? `${digitConversion}ty`;
    }

    function convert(number) {
        var absoluteNumber = Math.abs(number);
        var length = numberLength(absoluteNumber);
        var firstDigit;
        var secondDigit;
        if (length > 2) {
            throwNumberLengthError(absoluteNumber, 2);
        } else if (length < 2) {
            return converter.convertDigit(absoluteNumber);
        } else {
            firstDigit = Math.floor(absoluteNumber / 10);
            secondDigit = absoluteNumber - firstDigit * 10;
            return convertTwoDigitNumber(firstDigit, secondDigit);
        }
    }

    self.method("convert", convert);
    return self;
};

var HundredsConverter = function (numberConverter) {
    var self = Object.create(this);
    var converter = numberConverter;

    function convertHundredPart(hundredPart) {
        var plurals = (
            hundredPart > 1
            ? "s"
            : ""
        );
        return `${converter.convertDigit(hundredPart)} hundred${plurals}`;
    }

    function convertTensPart(tensPart) {
        return (
            tensPart === 0
            ? ""
            : ` and ${converter.convertTens(tensPart)}`
        );
    }

    function convert(number) {
        var absoluteNumber = Math.abs(number);
        var length = numberLength(absoluteNumber);
        var hundredPart;
        var tensPart;
        if (length > 3) {
            throwNumberLengthError(absoluteNumber, 3);
        } else if (length < 3) {
            return converter.convertTens(absoluteNumber);
        } else {
            hundredPart = Math.floor(absoluteNumber / 100);
            tensPart = absoluteNumber - hundredPart * 100;
            hundredPart = convertHundredPart(hundredPart);
            tensPart = convertTensPart(tensPart);
            return `${hundredPart}${tensPart}`;
        }
    }

    self.method("convert", convert);
    return self;
};

var ThousandsConverter = function (numberConverter) {
    var self = Object.create(this);
    var converter = numberConverter;

    function convertThousandPart(thousandPart) {
        var plurals = (
            thousandPart > 1
            ? "s"
            : ""
        );
        return `${converter.convertHundreds(thousandPart)} thousand${plurals}`;
    }

    function convertHundredPart(hundredPart) {
        return `${converter.convertHundreds(hundredPart)}`;
    }

    function convert(number) {
        var absoluteNumber = Math.abs(number);
        var length = numberLength(absoluteNumber);
        var thousandPart;
        var hundredPart;
        if (length < 4) {
            return converter.convertHundreds(absoluteNumber);
        }
        if (length > 6) {
            throwNumberLengthError(absoluteNumber, 6);
        }
        if (length >= 4 && length <= 6) {
            thousandPart = Math.floor(absoluteNumber / 10 ** 3);
            hundredPart = absoluteNumber - (thousandPart * 10 ** 3);
            thousandPart = convertThousandPart(thousandPart);
            hundredPart = convertHundredPart(hundredPart);
            return `${thousandPart} ${hundredPart}`;
        }
    }

    self.method("convert", convert);
    return self;
};

var MillionsConverter = function (numberConverter) {
    var self = Object.create(this);
    var converter = numberConverter;

    function convertMillionPart(millionPart) {
        var plurals = (
            millionPart > 1
            ? "s"
            : ""
        );
        return `${converter.convertHundreds(millionPart)} million${plurals}`;
    }

    function convertThousandPart(thousandPart) {
        return converter.convertThousands(thousandPart);
    }

    function convert(number) {
        var absoluteNumber = Math.abs(number);
        var length = numberLength(absoluteNumber);
        var millionPart;
        var thousandPart;
        if (length < 7) {
            return converter.convertThousands(number);
        }
        if (length > 9) {
            throwNumberLengthError(absoluteNumber, 9);
        } else {
            millionPart = Math.floor(absoluteNumber / 10 ** 6);
            thousandPart = absoluteNumber - millionPart * 10 ** 6;
            millionPart = convertMillionPart(millionPart);
            thousandPart = convertThousandPart(thousandPart);
            return `${millionPart} ${thousandPart}`;
        }

    }

    self.method("convert", convert);
    return self;
};

var BillionsConverter = function (numberConverter) {
    var self = Object.create(this);
    var converter = numberConverter;

    function convert(number) {
        var absoluteNumber = Math.abs(number);
        var length = numberLength(absoluteNumber);
        var billionPart;
        var millionPart;
        if (length < 10) {
            return convertMillionPart(absoluteNumber);
        }
        if (length > 12) {
            throwNumberLengthError(number, 12);
        } else {
            billionPart = Math.floor(number / 10 ** 9);
            millionPart = absoluteNumber - (billionPart * 10 ** 9);
            billionPart = convertBillionPart(billionPart);
            millionPart = convertMillionPart(millionPart);
            return `${billionPart} ${millionPart}`;
        }

    }

    function convertBillionPart(billionPart) {
        var plurals = (
            billionPart > 1
            ? "s"
            : ""
        );
        return `${converter.convertHundreds(billionPart)} billion${plurals}`;
    }

    function convertMillionPart(millionPart) {
        return converter.convertMillions(millionPart);
    }

    self.method("convert", convert);
    return self;
};


var NumberConverter = function () {
    var self = Object.create(this);
    var digitConverter;
    var tensConverter;
    var hundredConverter;
    var thousandsConverter;
    var millionsConverter;
    var billionsConverter;

    function convertDigit(digit) {
        return digitConverter.convert(digit);
    }

    function convertTens(number) {
        return tensConverter.convert(number);
    }

    function convertHundreds(number) {
        return hundredConverter.convert(number);
    }

    function convertThousands(number) {
        return thousandsConverter.convert(number);
    }

    function convertMillions(number) {
        return millionsConverter.convert(number);
    }

    function convertBillions(number) {
        return billionsConverter.convert(number);
    }

    self.method("convertDigit", convertDigit);
    self.method("convertTens", convertTens);
    self.method("convertHundreds", convertHundreds);
    self.method("convertThousands", convertThousands);
    self.method("convertMillions", convertMillions);
    self.method("convertBillions", convertBillions);

    digitConverter = new DigitConverter();
    tensConverter = new TensConverter(self);
    hundredConverter = new HundredsConverter(self);
    thousandsConverter = new ThousandsConverter(self);
    millionsConverter = new MillionsConverter(self);
    billionsConverter = new BillionsConverter(self);
    return self;
};

module.exports = NumberConverter;
