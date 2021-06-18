const { assert } = require('chai');
const { numberLength, throwNumberLengthError } = require('./number_helper');

module.exports = class MillionsConverter{
    #numberConverter;
    #millionKey;
    constructor(numberConverter) {
        this.#numberConverter = numberConverter;
    }
    convert(number) {
        let absoluteNumber = Math.abs(number);
        let length = numberLength(absoluteNumber);
        if (length < 7) {
            return this.#numberConverter.convertThousands(number);
        } else if (length > 9) {
            throwNumberLengthError(absoluteNumber, 9);
        } else {
            let millionPart = Math.floor(absoluteNumber / 10 ** 6);
            let thousandPart = absoluteNumber - millionPart * 10 ** 6;
            return `${this.#convertMillionPart(millionPart)} ${this.#convertThousandPart(thousandPart)}`;
        }
        
    }
    #convertMillionPart(millionPart) {
        return `${this.#numberConverter.convertHundreds(millionPart)} million${millionPart > 1 ? 's' : ''}`;
    }

    #convertThousandPart(thousandPart) {
        return this.#numberConverter.convertThousands(thousandPart);
    }
}