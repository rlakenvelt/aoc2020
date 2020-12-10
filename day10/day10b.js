
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 10B");
let adapters = shared.getNumericInput()
                     .sort((a,b) => a-b);
adapters.push(adapters[adapters.length-1] + 3);
adapters.unshift(0);

const rangesWithDifferenceOfOne = [];
let last = 0;
let lastend = 0;
let start = 0;
let length = 0;
adapters.forEach((adapter, index) => {
    if (index > 0) {
        if (adapter - last === 1) {
            length++;
        }
        else
        {
            if (length > 1) rangesWithDifferenceOfOne.push({start: last-length, end: last, next: adapter});
            lastend = last;
            length = 0;
        }
    } 
    last = adapter;
});
answer = rangesWithDifferenceOfOne.reduce((total, range) => {
    const length = range.end - range.start - 1;
    if (length <= 2) {
        total = total * Math.pow(2, range.end - range.start -1);
    } else { // big assumption that the range is never more than 5 long, which is the case with this puzzle input
        total = total * (Math.pow(2, range.end - range.start -1) - 1); 
    }
    return total;
}, 1);

shared.end(answer);



