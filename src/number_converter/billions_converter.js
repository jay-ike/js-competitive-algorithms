const { numberLength, throwNumberLengthError } = require('./number_helper');

module.exports = class BillionsConverter{
    #numberConverter;
    #billionKey='billion';
    constructor(numberConverter) {
        this.#numberConverter = numberConverter;
    }

    convert(number) {
        let absoluteNumber = Math.abs(number);
        let length = numberLength(absoluteNumber);
        if (length < 10) {
            return this.#convertMillionPart(absoluteNumber);
        } else if (length > 12) {
            throwNumberLengthError(number, 12);
        } else {
            let billionPart = Math.floor(number / 10 ** 9);
            let millionPart = absoluteNumber - (billionPart * 10 ** 9);
            return `${this.#convertBillionPart(billionPart)} ${this.#convertMillionPart(millionPart)}`;
        }
        
    }

    #convertBillionPart(billionPart) {
        return `${this.#numberConverter.convertHundreds(billionPart)} ${this.#billionKey}${billionPart>1?'s':''}`
    }

    #convertMillionPart(millionPart) {
        return this.#numberConverter.convertMillions(millionPart);
    }
}