
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 12A");

const directions = [];
directions.push({direction: 'N', x: 0, y: -1, L: 'W', R: 'E'});
directions.push({direction: 'E', x: 1, y: 0, L: 'N', R: 'S'});
directions.push({direction: 'S', x: 0, y: 1, L: 'E', R: 'W'});
directions.push({direction: 'W', x: -1, y: 0, L: 'S', R: 'N'});
const instructions = shared.getInput()
                           .map(line => { return {instruction: line.substring(0,1), value: parseInt(line.substring(1))}});
const position={x:0, y:0, direction: 'E'};

instructions.forEach(instruction => {
    let direction;
    switch (instruction.instruction) {
        case 'F':
            direction = directions.find(d => d.direction === position.direction);
            position.x+=direction.x*instruction.value;
            position.y+=direction.y*instruction.value;
            break; 
        case 'L': 
        case 'R': 
            const turns = instruction.value / 90;
            for (let i = 0; i<turns; i++) {
                direction = directions.find(d => d.direction === position.direction);
                position.direction = direction[instruction.instruction];
            }
            break; 
        default: 
            direction = directions.find(d => d.direction === instruction.instruction);
            position.x+=direction.x*instruction.value;
            position.y+=direction.y*instruction.value;
            break; 
    }     
});
answer = Math.abs(position.x) + Math.abs(position.y);

shared.end(answer);

