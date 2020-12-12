
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 12B");

const directions = [];
directions.push({direction: 'N', x: 0, y: -1});
directions.push({direction: 'E', x: 1, y: 0});
directions.push({direction: 'S', x: 0, y: 1});
directions.push({direction: 'W', x: -1, y: 0});
const instructions = shared.getInput()
                           .map(line => { return {instruction: line.substring(0,1), value: parseInt(line.substring(1))}});
const position={x:0, y:0};
const waypoint={x:10, y:-1};

instructions.forEach((instruction, index) => {
    let direction;
    let turns;
    switch (instruction.instruction) {
        case 'F':
            position.x+=instruction.value*waypoint.x;
            position.y+=instruction.value*waypoint.y;
            break; 
        case 'L': 
            turns = instruction.value / 90;
            for (let i = 0; i<turns; i++) {
                const tmpX = waypoint.x;
                const tmpY = waypoint.y;
                waypoint.y = -tmpX;
                waypoint.x = tmpY;
            }
            break;
        case 'R': 
            turns = instruction.value / 90;
            for (let i = 0; i<turns; i++) {
                const tmpX = waypoint.x;
                const tmpY = waypoint.y;
                waypoint.y = tmpX;
                waypoint.x = -tmpY;
            }
            break; 
        case 'N': 
        case 'S': 
        case 'E': 
        case 'W': 
            direction = directions.find(d => d.direction === instruction.instruction);
            waypoint.x+=direction.x*instruction.value;
            waypoint.y+=direction.y*instruction.value;
            break; 
    }     
});
answer = Math.abs(position.x) + Math.abs(position.y);


shared.end(answer);

