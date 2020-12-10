
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 10A");
const adapters = shared.getNumericInput()
                       .sort((a,b) => a-b);
const differences = [0, 0, 0];
let last = 0;
differences[adapters[0]-1]++; 
adapters.push(adapters[adapters.length-1] + 3);
adapters.forEach((adapter, index) => {
    if (index > 0) {
        differences[adapter - last -1]++; 
    } 
    last = adapter;
});
answer = differences[0] * differences[2];


shared.end(answer);



