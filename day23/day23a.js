
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 23A");

let cups = shared.getInput()[0]
                   .split('')
                   .map(x=>parseInt(x));

const CUPS=cups.length;
const TAKE=3;

for (let count=1; count<=100; count++) {
    const part = cups.splice(1, TAKE);
    const destination=newDestination(cups[0], part);
    const index = cups.indexOf(destination)+1;
    cups.splice(index, 0, ...part);
    cups.push(cups.shift());
}

answer=cups.join('').split('1').reverse().join('');
shared.end(answer);

function newDestination(current, exclude) {
    do {
        current = (current>1) ? current-1 : CUPS;
    }
    while (exclude.includes(current));    
    return current;
}
