
const { join } = require('path');
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 14B");
const program = shared.getInput()
                      .map(x=> x.split('='))
                      .map(x=> {
                          let instruction = x[0].trim();
                          if (instruction==='mask') return {instruction: 'mask', value: x[1].trim()};
                          let address = instruction.replace('mem[', '');
                          address = address.replace(']', '');
                          return {instruction: parseInt(address), value: parseInt(x[1].trim())};
                        });
let memory={};
let mask = [];
program.forEach(line=> {
    if (line.instruction==='mask') {
        mask = line.value.split('');
    } else {
        let address = parseInt(line.instruction, 10).toString(2).split('');
        address=[...new Array(36-address.length).fill('0'), ...address];
        for (let i = 0; i<address.length; i++) {
            if (mask[i]!='0')address[i] = mask[i];
        }
        const floating = address.reduce((list, bit, index) => {
                                    if (bit==='X') list.unshift(35-index);
                                    return list;
                                }, [])
        const combinations = Math.pow(2, floating.length);
        for (let c = 0; c<combinations; c++) {
            let cmb = c.toString(2);
            cmb = ('0'.repeat(floating.length-cmb.length) + cmb).split('');
            const assignAddress = [...address].reverse();
            floating.forEach((bit, index) => {
                assignAddress[bit] = cmb[index];
            })
            const decimalAddress = parseInt(assignAddress.reverse().join(''), 2)
            memory[decimalAddress] = line.value;
    }

    }
})
Object.keys(memory).forEach(address=> {
    answer+=memory[address];
});

shared.end(answer);



