const { numberLength, throwNumberLengthError } = require('./number_helper');

module.exports = class HundredsConverter{
    #hundredKey = 'hundred';
    #numberConverter;
    constructor(numberConverter) {
        this.#numberConverter = numberConverter;
    }
    convert(number) {
        let absoluteNumber = Math.abs(number)
        let length = numberLength(absoluteNumber);
        if (length > 3) {
            throwNumberLengthError(absoluteNumber, 3);
        } else if (length < 3) {
            return this.#numberConverter.convertTens(absoluteNumber)
        } else {
            let hundredPart = Math.floor(absoluteNumber / 100)
            let tensPart = absoluteNumber - hundredPart * 100;
            return `${this.#convertHundredPart(hundredPart)}${this.#convertTensPart(tensPart)}`;
        }
    }

    #convertHundredPart(hundredPart) {
        return `${this.#numberConverter.convertDigit(hundredPart)} ${this.#hundredKey}${hundredPart > 1 ? 's' : ''}`
    }

    #convertTensPart(tensPart) {
        return tensPart === 0 ? '' : ` and ${this.#numberConverter.convertTens(tensPart)}`;
    }
}