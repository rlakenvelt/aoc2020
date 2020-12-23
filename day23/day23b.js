
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 23B");

let cups = shared.getInput()[0]
                   .split('')
                   .map(x=>parseInt(x));

const NUMBER_OF_CUPS  = 1000000;
const NUMBER_OF_ROUNDS=10000000;

const TAKE=3;
for (i = 10; i<=NUMBER_OF_CUPS; i++) {
    cups.push(i);
}
const CUPS=cups.length;

let pointers=new Array();
for (let i = 0; i < CUPS; i++) {
    const pointerIndex=(i+1)===CUPS ? 0 : i+1;
    pointers[cups[i]] = cups[pointerIndex];
}

let currentCup = cups[0];
for (let count=1; count<=NUMBER_OF_ROUNDS; count++) {
    const part = [];
    let label = currentCup;
    for (let i=0; i<TAKE; i++) {
        part.push(pointers[label]);
        label=pointers[label];
    }
    const destination=newDestination(currentCup, part);

    pointers[currentCup]=pointers[part[2]];
    pointers[part[2]]=pointers[destination];
    pointers[destination]=part[0];
    currentCup=pointers[currentCup];
}

const value1 = pointers[1];
const value2 = pointers[value1];

shared.end(value1*value2);

function newDestination(current, exclude) {
    do {
        current = (current>1) ? current-1 : CUPS;
    }
    while (exclude.includes(current));    
    return current;
}
