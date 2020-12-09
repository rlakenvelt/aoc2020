
const shared = require('../common/base.js');

let answer = 0;
let found = false;
const preamble = 25;
let invalidnumber = 0;
shared.start("day 9B");
const numbers = shared.getNumericInput();
for (let i = preamble; i < numbers.length; i++) {
    found = false;
    for (let j = i - preamble; j < i; j++) {
        for (let k = i - preamble; k < i; k++) {
            if (k!==j) {
                if (numbers[j] + numbers[k] === numbers[i]) {
                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }
    if (!found) {
        invalidnumber = numbers[i];
        break;
    }
}
found = false;
let end = 0;
for (let i = 0; i < numbers.length; i++) {
    let total = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
        total+=numbers[j];
        if (total===invalidnumber) {
            found = true;
            end = j;
            break;
        }
        if (total>=invalidnumber) {
            break;
        }    
    }
    if (found) {
        const part = numbers.slice(i, end+1).sort((a, b)=> a-b);
        answer = part[0] + part[part.length-1];
        break;
    }
}
shared.end(answer);



