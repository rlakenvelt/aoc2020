
const shared = require('../common/base.js');
const computer = require('../common/computer.js');

let answer = 0;
shared.start("day 8B");
const program = shared.getInput()
                      .map(a => {
                          const line = a.split(' ');
                          return {instruction: line[0], value: parseInt(line[1])};
                      });
const vm = Object.create(computer.computer);
let lastChanged = -1;
do {
    const changedProgram = program.map(x=>{ return {...x}});
    for (let i = lastChanged + 1; i < changedProgram.length; i++) {
        lastChanged++;
        if (changedProgram[i].instruction === 'nop') {
            changedProgram[i].instruction = 'jmp';
            break;
        }
        if (changedProgram[i].instruction === 'jmp') {
            changedProgram[i].instruction = 'nop';
            break;
        }
    }
    vm.load(changedProgram);
    vm.run();
    answer = vm.getOutput();
}
while (vm.hasError() );


shared.end(answer);



