
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 10B alternative");
let adapters = shared.getNumericInput()
                     .sort((a,b) => a-b);
adapters.push(adapters[adapters.length-1] + 3);
adapters.unshift(0);

answer = adapters.reduce(getTangesOfDirectlyAdjacentAdapters, [{start: 0, end: 0}])
                 .reduce((total, range) => {
                        return total * countPathsForRange(range.start, range.end);
                 }, 1);;

function countPathsForRange(start, end) {
    if (start>=end) return 1;
    let paths = 0;
    for (let i = start + 1; i <= Math.min(start + 3, end); i++) {
        paths+=countPathsForRange(i, end);
    }
    return paths;
}

function getTangesOfDirectlyAdjacentAdapters (list, adapter, index) {
    let currentRange = list[0];
    if (adapter - currentRange.end > 1) {
        currentRange = list.unshift({start: adapter, end: adapter})
    }
    currentRange.end = adapter;
 
    return list;
}

shared.end(answer);



