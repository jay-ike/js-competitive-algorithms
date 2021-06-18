const { numberLength, throwNumberLengthError} = require("./number_helper");
const NumberConverter = require('./number_converter');


module.exports = class TensConverter{
    #numberConverter;
    #tensSpecial = { 0: 'ten', 1: 'eleven', 2: 'twelve', 3: 'thirteen', };
    #specialFirstDigit = {2:'twenty',3:'thirty',8:'eighty',5:'fifty'}
    constructor(numberConverter) {
        this.#numberConverter = numberConverter;

    }

    convert(number) {
        let absoluteNumber = Math.abs(number);
        let length = numberLength(absoluteNumber);
        if (length > 2) {
            throwNumberLengthError(absoluteNumber, 2);
        } else if (length < 2) {
            return this.#numberConverter.convertDigit(absoluteNumber);
        } else {
            let firstDigit = Math.floor(absoluteNumber / 10);
            let secondDigit = absoluteNumber - firstDigit * 10;
            return this.#convertTwoDigitNumber(firstDigit, secondDigit);
        }
    }
    
    #convertTwoDigitNumber(firstDigit, secondDigit) {
        if (firstDigit === 1) {
            return this.#convert1xNumber(secondDigit);
        } else {
            return `${this.#convertFirstDigit(firstDigit)} ${this.#numberConverter.convertDigit(secondDigit)}`
        }
    }
    
    #convert1xNumber(x) {
        return this.#tensSpecial[x] ?? `${this.#numberConverter.convertDigit(x)}teen`;
        
    }
    
    #convertFirstDigit(firstDigit) {
        return this.#specialFirstDigit[firstDigit] ?? `${this.#numberConverter.convertDigit(firstDigit)}ty`;
        
    }


}

