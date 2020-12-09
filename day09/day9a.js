
const shared = require('../common/base.js');

let answer = 0;
let found = false;
const preamble = 25;
shared.start("day 9A");
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
        answer = numbers[i];
        break;
    }
}


shared.end(answer);



