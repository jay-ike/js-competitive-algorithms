var {numberLength,throwNumberLengthError} = require('./number_helper');

module.exports = class DigitConverter {
    #digitDictionary = {0:'zero',1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine'};

    convert(digit) {
        let length = numberLength(digit);
        if (length > 1) {
            throwNumberLengthError(digit, 1);
        }
        let absoluteNumber = Math.abs(digit);
        return this.#digitDictionary[absoluteNumber];
    }

};

