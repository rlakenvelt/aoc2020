
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 13A");
const input = shared.getInput();
const etd = parseInt(input[0]);
const busses = input[1].split(',')
                       .filter(x=> x!='x')
                       .map(x=>parseInt(x));

const list = busses.map(bus=>{return {bus: bus, leavesIn: bus - etd%bus}})
                   .sort((a, b) => a.leavesIn-b.leavesIn);
answer=list[0].bus*list[0].leavesIn;
shared.end(answer);
