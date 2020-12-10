
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 10B");
let adapters = shared.getNumericInput()
                     .sort((a,b) => a-b);
adapters.push(adapters[adapters.length-1] + 3);
adapters.unshift(0);

const rangesOfDirectlyAdjacentAdapters = [];
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
            if (length > 1) rangesOfDirectlyAdjacentAdapters.push({start: last-length, end: last, next: adapter});
            lastend = last;
            length = 0;
        }
    } 
    last = adapter;
});
answer = rangesOfDirectlyAdjacentAdapters.reduce((total, range) => {
    const rangelength = range.end - range.start + 1;
    // The first and the last entry in the range must be used to bridge the gap to the previous and the next range
    // The rest of the adapters in the range can be used/notused in any combination 
    if (rangelength <= 4) {
        total = total * Math.pow(2, rangelength - 2);
    } else { 
        // When the range is longer than 4 (ie. 3 or more adapters can vary regarding used/notused) then
        // not all adapters can be left out. Otherwise the gap to brigde can be to long.
        // When the range is 5 then exactly one combination (all adapters in between are not used) is not possible
        // Big assumption that the range is never more than 5 long, which is the case with this puzzle input,
        // because that would cause a lot more combinatries that are not possible.
        total = total * (Math.pow(2, range.end - range.start -1) - 1); 
    }
    return total;
}, 1);

shared.end(answer);



