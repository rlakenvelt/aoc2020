
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 25A");
const input = shared.getNumericInput('\n');
const loops=input.map(x=>determineLoops(x, 7));

answer=(performTransform(input[0], loops[1]));
shared.end(answer);


function performTransform(subject, loop) {
    let result=1;
    for (let i=1; i<=loop; i++) {
        result=transform(result, subject);
    }
    return result;
}

function determineLoops(public, subject) {
    let loop=0;
    let result=1;
    do {
        loop++;  
        result=transform(result, subject);     
    } while(result!==public);
    return loop;
}

function transform(current, subject) {
    current*=subject;
    return current%20201227;
}