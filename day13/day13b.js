
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 13B");
const input = shared.getInput();
const busses = input[1].split(',')
                       .map((x,i)=>{return {bus: x, index:i}})
                       .filter(x=> x.bus!='x')
                       .map(x=> {return {ID: parseInt(x.bus), index: x.index}});
// Every is the least common multiplier of the last 2 busses
// or  the last LCM and the next bus                      
let every = busses[0].ID;
for (let i = 1; i<busses.length; i++) {
    let found = false;
    // Check next bus in steps with size of the last LCM
    for (let t = answer; !found; t+=every) {
        if ((t+busses[i].index)%busses[i].ID!=0) continue;
        answer=t;
        found = true;
    }
    every = lcm(every, busses[i].ID);
}

shared.end(answer);

function lcm  (i1, i2) {
    return ((i1 * i2) / gcd(i1, i2));
}

function gcd  (i1, i2) {
    if (i2 === 0) return i1;
    return gcd(i2, i1 % i2);
}
