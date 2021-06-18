const { numberLength, throwNumberLengthError } = require('./number_helper')

module.exports = class ThousandsConverter{
    #numberConverter;
    #thousandsKey = 'thousand';
    constructor(numberConverter) {
        this.#numberConverter = numberConverter;
    }

    convert(number) {
        let absoluteNumber = Math.abs(number);
        let length = numberLength(absoluteNumber);
        if (length < 4) {
            return this.#numberConverter.convertHundreds(absoluteNumber);
        } else if (length > 6) {
            throwNumberLengthError(absoluteNumber,6)
        } else {
            let thousandPart = Math.floor(absoluteNumber / 10 ** 3);
            let hundredPart = absoluteNumber - (thousandPart * 10 ** 3);
            return `${this.#convertThousandPart(thousandPart)} ${this.#convertHundredPart(hundredPart)}`;
        }
    }

    #convertThousandPart(thousandPart) {
        return `${this.#numberConverter.convertHundreds(thousandPart)} ${this.#thousandsKey}${thousandPart > 1 ? 's' : ''}`;
    }

    #convertHundredPart(hundredPart) {
        return `${this.#numberConverter.convertHundreds(hundredPart)}`;
    }
}