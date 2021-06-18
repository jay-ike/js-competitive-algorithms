
const DigitConverter = require('./digit_converter');
const TensConverter = require('./tens_converter');
const HundredsConverter = require('./hundreds_convert');
const ThousandsConverter = require('./thousands_converter');
const MillionsConverter = require('./millions_converter');
const BillionsConverter = require('./billions_converter');

module.exports = class NumberConverter{
    #digitConverter;
    #tensConverter;
    #hundredsConverter;
    #thousandsConverter;
    #millionsConverter;
    #billionsConverter;
    constructor(){}
    
    static createConverter() {
        let converter = new NumberConverter();
        converter.#createComponents();
        return converter;
    }

    #createComponents() {
        this.#digitConverter = new DigitConverter();
        this.#tensConverter = new TensConverter(this);
        this.#hundredsConverter = new HundredsConverter(this);
        this.#thousandsConverter = new ThousandsConverter(this);
        this.#millionsConverter = new MillionsConverter(this);
        this.#billionsConverter = new BillionsConverter(this)
    }

    convertDigit(digit) {
        return this.#digitConverter.convert(digit);
    }
    convertTens(number) {
        return this.#tensConverter.convert(number);

    }
    convertHundreds(number) {
        return this.#hundredsConverter.convert(number);
    }

    convertThousands(number) {
        return this.#thousandsConverter.convert(number);
    }

    convertMillions(number) {
        return this.#millionsConverter.convert(number);
    }

    convertBillions(number) {
        return this.#billionsConverter.convert(number);
    }
}