
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 15B");
const input = shared.getNumericInput(',');
const lastSpoken=new Uint32Array(30000000);
for (let i = 0; i<input.length; i++) {
    lastSpoken[input[i]] = i+1;
}
let turn = input.length;
let newNumber = 0;
let lastTurn=turn;
do {
    newNumber = turn-lastTurn;
    turn++;
    lastTurn = lastSpoken[newNumber];
    if (!lastTurn) lastTurn = turn;
    lastSpoken[newNumber]=turn;
} while (turn < 30000000);
answer=newNumber;

shared.end(answer);



