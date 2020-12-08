
const shared = require('../common/base.js');
const computer = require('../common/computer.js');

let answer = 0;
shared.start("day 8A");
const program = shared.getInput()
                      .map(a => {
                          const line = a.split(' ');
                          return {instruction: line[0], value: parseInt(line[1])};
                      });
const vm = Object.create(computer.computer);

vm.load(program);
vm.run();
answer = vm.getOutput();

shared.end(answer);



