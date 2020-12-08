
const shared = require('../common/base.js');
const computer = require('../common/computer.js');

let answer = 0;
shared.start("day 8A");
const program = shared.getInput()
                      .map(a => {
                          const line = a.split(' ');
                          return {instruction: line[0], value: parseInt(line[1])};
                      });
let comp = Object.create(computer.computer);

comp.load(program);
comp.run();
answer = comp.getAccumulator();

shared.end(answer);



