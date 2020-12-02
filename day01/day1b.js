const shared = require('../common/base.js');

const report = shared.getNumericInput();

shared.start("day 1B");
let answer = 0;
report.some((value, index) => {
    report.some((value2, index2) => {
        report.some((value3, index3) => {
            if (index !== index2 != index3) {
                if (value + value2 + value3 === 2020) {
                    answer = value * value2 * value3;
                    return true;
                }
            }
        })
    })
});
shared.end(answer);

