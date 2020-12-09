
const shared = require('../common/base.js');

let answer = 0;
let invalidnumber = 0;
const preamble = 25;
shared.start("day 9A");
const numbers = shared.getNumericInput();
for (let i = preamble; i < numbers.length; i++) {
    if (!hasTwoNumbersThatAddUpToValue(numbers.slice(i - preamble, i), numbers[i])) {
        invalidnumber = numbers[i];
        break;
    }
}

for (let i = 0; i < numbers.length; i++) {
    const set = contiguousSetThatAddsUpToValue(i, invalidnumber);
    if (set) {
        answer = set[0] + set[set.length-1];
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
function contiguousSetThatAddsUpToValue(startindex, searchvalue) {
    let total = 0;
    for (let i = startindex; i < numbers.length; i++) {
        total+=numbers[i];
        if (total===searchvalue) return numbers.slice(startindex, i+1).sort((a, b)=> a-b);
        if (total>=searchvalue) break;
    }
    return null;
}

shared.end(answer);



