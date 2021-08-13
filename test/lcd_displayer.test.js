const { assert } = require("chai");
const { it } = require('mocha');
const  LcdDisplay = require('../src/coding_interviews_algorithms/lcd_display');

describe('testing the lcd display', function () {
    var lcdDisplay;
    before(function () {
        lcdDisplay = new LcdDisplay();
        firstResult = 
`    
    |
     
   |
     `;
    });

    describe('lcd display for on bar strings', function () {
        it('should display the value of 123 in lcd style', function () {
            let display = lcdDisplay.display(1, 1);
            console.log(display);
            assert.equal(display.trim(), firstResult.trim())
        });
        it('should throw exception if not given a number as input', function () {
            assert.throws(() => lcdDisplay.display('new test',2),'new test is not a Number')
        });
        
    });
    
 });