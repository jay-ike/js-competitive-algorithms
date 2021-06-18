const { assert } = require("chai");
const { it } = require("mocha");
const DigitConverter = require('../src/number_converter/digit_converter');
const NumberConverter = require('../src/number_converter/number_converter');
const { numberLength, throwTypeError } = require("../src/number_converter/number_helper");

describe('number converter tests', function () { 
    describe('digit converter tests', function () { 
        var digitConverter ;
        before(function () { 
            digitConverter = new DigitConverter();
        });
        it('should print the value of 0 in words', function () { 
            assert.equal(digitConverter.convert(5), 'five');
        });

        it('should print 60 exceed 1 digit', function () { 
            assert.throws(()=> digitConverter.convert(60),Error, '60 exceed 1 digit');
        });

        it('should print negative value as positive value', function () { 
            assert.equal(digitConverter.convert(-5), 'five');
        });


    });
    var numberConverter;
    before(function () { 
        numberConverter = NumberConverter.createConverter();
    });

    describe('tens converter test', function () {
        it('should print the value of 14 in words', function () {
            assert.equal(numberConverter.convertTens(14), 'fourteen');
        });

        it('should print in the value of 84 in words', function () {
            assert.equal(numberConverter.convertTens(84), 'eighty four');
        });
        it('should print the value 59 in words', function () { 
            assert.equal(numberConverter.convertTens(59), 'fifty nine');
        });
        it('should throw an error if the length of the number is greater than 2', function () {
            assert.throws(() => numberConverter.convertTens(600), Error, '600 exceed 2 digits');
        });
    });
    
    describe('hundreds converter test', function () { 
        it('should print the value of 154 in words', function () {
            assert.equal(numberConverter.convertHundreds(154),'one hundred and fifty four')
        });
        it('should print the value of 54 in words', function () { 
            assert.equal(numberConverter.convertHundreds(54),'fifty four')
        });

        it('should print the value of 599 in words', function () { 
            assert.equal(numberConverter.convertHundreds(599),'five hundreds and ninety nine')
        });
        it('should throw an error if the length of the number is greater than 2', function () {
            assert.throws(() => numberConverter.convertHundreds(1600), Error, '1600 exceed 3 digits');
        });
    });

    describe('thousands converter test', function () {
        it('should print the value of 1551 in words', function () {
            assert.equal(numberConverter.convertThousands(1551), 'one thousand five hundreds and fifty one')
        });
        it('should print the value of 0 in words', function () {
            assert.equal(numberConverter.convertThousands(0), 'zero')
        });
        it('should print the value of 500700 in words', function () {
            assert.equal(numberConverter.convertThousands(500700), 'five hundreds thousands seven hundreds');
        });
        it('should print negative value as positive value', function () { 
            assert.equal(numberConverter.convertThousands(-500700), 'five hundreds thousands seven hundreds');
        });
        it('should throw an error if the length of the number is greater than 2', function () {
            assert.throws(() => numberConverter.convertThousands(1000600), Error, '1000600 exceed 6 digits');
        });
    });

    describe('million converter test', function () {
        it('should print the value of 1500005', function () {
            assert.equal(numberConverter.convertMillions(1500005), 'one million five hundreds thousands five');
        });
        it('should throw an error if the length of the number is greater than 2', function () {
            assert.throws(() => numberConverter.convertMillions(20_000_000_600), Error, '20000000600 exceed 9 digits');
        });
        it('should print the value of 0 in words', function () {
            assert.equal(numberConverter.convertMillions(0), 'zero');
        });
    });

    describe('billion converter test', function () { 
        it('should print the value of 5_500_000_687', function () { 
            assert.equal(numberConverter.convertBillions(5_500_000_687), 'five billions five hundreds millions six hundreds and eighty seven');
        });
        it('should throw an error if the length of the number is greater than 2', function () {
            assert.throws(() => numberConverter.convertBillions(50_000_500_800_600), Error, '50000500800600 exceed 12 digits');
        });
        it('should print the value of 0 in words', function () {
            assert.equal(numberConverter.convertBillions(0), 'zero');
        })
    });

});

describe('number_helper test', function () {
    it('should throw error if not given a number', function () {
        assert.throws(() => numberLength('1234'), TypeError, '1234 is not a number');
    });
    it('should throw an error', function () {
        assert.throws(() => throwTypeError('quirkier', Number), TypeError);
    });
});