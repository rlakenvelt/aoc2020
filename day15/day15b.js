
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 15B");
const input = shared.getInput(',');
let spokenNumbers = input.reduce((list, number, index) => {
                             list[number] = {number: number, first: true, last: index, prev: 0};
                             return list;
                         }, {});
let index = input.length;
let last = input[index-1];
let lastNumber = spokenNumbers[last];
do {
    let newNumber = 0;
    if (!lastNumber.first) {
        newNumber = lastNumber.last - lastNumber.prev;
    }
    lastNumber = spokenNumbers[newNumber]; 
    if (!lastNumber) {
        lastNumber = {number: newNumber, first: true, last: index, prev: index};
        spokenNumbers[newNumber] = lastNumber;
    } else {
        lastNumber.first = false;
        lastNumber.prev  = lastNumber.last;
        lastNumber.last  = index;
    }
    index++;
    console.log(newNumber);
} while (index < 30000000);
answer=lastNumber.number;

shared.end(answer);



