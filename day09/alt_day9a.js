
const shared = require('../common/base.js');

let answer = 0;
let found = false;
const preamble = 25;
shared.start("day 9A");
const numbers = shared.getNumericInput();
for (let i = preamble; i < numbers.length; i++) {
    if (!hasTwoNumbersThatAddUpToValue(numbers.slice(i - preamble, i), numbers[i])) {
        answer = numbers[i];
        break;
    }
}

function hasTwoNumbersThatAddUpToValue(list, total) {
    for (let index = 0; index < list.length; index++) {
        if (list.some(number => number + list[index] === total )) {
            return true;
        }
    }
    return false;
}


shared.end(answer);



