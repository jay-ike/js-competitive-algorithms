const { generateArray,throwIfNaN} = require('../utils')


class VerticalPrintConfig{
    #withLeftBarSet
    #withRightBarSet
    #withBothBarSet
    
    constructor(withLeftBarSet, withRightBarSet, withBothBarSet) {
        this.#withLeftBarSet = withLeftBarSet
        this.#withRightBarSet = withRightBarSet
        this.#withBothBarSet = withBothBarSet

    }
    
    get withBothBarSet() {
        return this.#withBothBarSet
    }
    get withLeftBarSet() {
        return this.#withLeftBarSet
    }
    get withRightBarSet() {
        return this.#withRightBarSet
    }
}

class LineSetBuilder{
    #linesIndexMap
    #firstLineSet
    #secondLineSet
    #thirdLineSet
    #fourthLineSet
    #fifthLineSet
    constructor() {
        this.#firstLineSet = new Set(generateArray(10)).exclude(new Set([1, 4]))
        let secondLineLeftSet = new Set([5, 6]), secondLineRightSet = new Set([1, 2, 3, 7])
        let secondLineBothSet = new Set([0,4,8,9])
        this.#secondLineSet = new VerticalPrintConfig(secondLineLeftSet, secondLineRightSet, secondLineBothSet)
        this.#thirdLineSet = new Set(generateArray(10)).exclude(new Set([0, 1, 7]))
        let fourthLineLeftSet = new Set([2]), fourthLineBothSet = new Set([0, 6, 8])
        let fourthLineRightSet = new Set(generateArray(10)).exclude(fourthLineBothSet.union(fourthLineLeftSet))
        this.#fourthLineSet = new VerticalPrintConfig(fourthLineLeftSet, fourthLineRightSet, fourthLineBothSet)
        this.#fifthLineSet = new Set(generateArray(10)).exclude(new Set([1, 7]))
        this.#linesIndexMap = { 1: this.#firstLineSet, 2: this.#secondLineSet, 3: this.#thirdLineSet, 4: this.#fourthLineSet, 5: this.#fifthLineSet, };
    }
    
    get linesIndexMap() {
        return this.#linesIndexMap;
    }
}

module.exports = class LcdDisplay{
    #lineSet  
    constructor() {
        this.#lineSet = new LineSetBuilder()
    }
    display(number, characterSize) {
        let result = ''
        throwIfNaN(number);
        for (let index = 1; index <=5; index++) {
            result = `${result}${this.#computeLinePrinting(number, characterSize, index)}`;
        }
        return result;
    }
    #computeLinePrinting(number, characterSize, lineIndex) {
        let intPartResult = '', decimalPartResult = ''
        let result = ''
        let [intPart, decimalPart] = `${Number.parseFloat(number)}`.split('.')
        decimalPart = Number.parseInt(decimalPart ?? 0) === 0 ? '' : decimalPart;
        for (let index = 0; index < intPart.length; index++) {
            const digit = Number.parseInt(intPart[index]);
            intPartResult = `${intPartResult} ${lineIndex % 2 === 0 ? this.#computeVerticalPrinting(digit, characterSize, this.#lineSet.linesIndexMap[lineIndex]) : this.#computeHorizontalPrinting(digit, characterSize, this.#lineSet.linesIndexMap[lineIndex])}`;
        }
        for (let index = 0; index < decimalPart.length; index++) {
            const digit = Number.parseInt(decimalPart[index]);
            decimalPartResult = `${decimalPartResult} ${lineIndex % 2 === 0 ? this.#computeVerticalPrinting(digit, characterSize, this.#lineSet.linesIndexMap[lineIndex]) : this.#computeHorizontalPrinting(digit, characterSize, this.#lineSet.linesIndexMap[lineIndex])}`;
        }
        if (lineIndex % 2 === 0) {
            result = `${intPartResult}${decimalPartResult === '' ?'': ` ${decimalPartResult}`}\n`.repeat(characterSize)
        } else if (lineIndex === 5) {
            result = ` ${intPartResult}${decimalPartResult === '' ?'': `.${decimalPartResult}`}`
        } else {
            result =  ` ${intPartResult}${decimalPartResult === '' ?'': ` ${decimalPartResult}`}\n`
        }
        return result
    }
    #computeHorizontalPrinting(digit, characterSize, printableSet) {
        return printableSet.has(digit) ? `${'-'.repeat(characterSize)}  ` : ' '.repeat(characterSize + 2)
    }

    #computeVerticalPrinting(digit, characterSize, printConfiguration) {
        let result = ''
        if (printConfiguration.withLeftBarSet.has(digit)) {
            result = this.#printVerticalSegment(characterSize,true,false)
        } else if (printConfiguration.withRightBarSet.has(digit)) {
            result = this.#printVerticalSegment(characterSize,false,true)
        } else if (printConfiguration.withBothBarSet.has(digit)) {
            result = this.#printVerticalSegment(characterSize,true,true)
        }
        return result
    }
    
    #printVerticalSegment(characterSize, hasLeftBar, hasRightBar) {
        let result = ''
        if (hasLeftBar && hasRightBar) {
            result = `|${' '.repeat(characterSize)}|` 
        } else if (hasLeftBar) {
            result = `|${' '.repeat(characterSize+1)}`
        } else if (hasRightBar) {
            result = `${' '.repeat(characterSize+1)}|`
        }
        return result
    }
};