const shared = require('../common/base.js');

const report = shared.getNumericInput();

shared.start("day 1A");
let answer = 0;
report.some((value, index) => {
    report.some((value2, index2) => {
        if (index !== index2) {
            if (value + value2 === 2020) {
                answer = value * value2;
                return true;
            }
        }
    })
});
shared.end(answer);

