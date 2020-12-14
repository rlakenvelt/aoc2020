
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 14A");
const program = shared.getInput()
                      .map(x=> x.split('='))
                      .map(x=> {
                          let instruction = x[0].trim();
                          if (instruction==='mask') return {instruction: 'mask', value: x[1].trim()};
                          instruction = instruction.replace('mem[', '');
                          instruction = instruction.replace(']', '');
                          return {instruction: parseInt(instruction), value: x[1].trim()};
                        });
let memory={};
let mask = [];


program.forEach(line=> {
    if (line.instruction==='mask') {
        mask = line.value.split('');
    } else {
        let binaryValue = parseInt(line.value, 10).toString(2);
        binaryValue = ('0'.repeat(36-binaryValue.length) + binaryValue).split('');
        let newValue = '';
        for (let i = 0; i<binaryValue.length; i++) {
            if (mask[i]==='X') {
                newValue = newValue + binaryValue[i];
            } else {
                newValue = newValue + mask[i];
            }
        }
        memory[line.instruction] = parseInt(newValue, 2);
    }
})
Object.keys(memory).forEach(pos=> {
    answer+=memory[pos];
});

shared.end(answer);



