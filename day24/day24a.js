
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 24A");
const directions = [];
directions.push({direction:'e', x: 2, y:0});
directions.push({direction:'se', x: 1, y:1});
directions.push({direction:'sw', x: -1, y:1});
directions.push({direction:'w', x: -2, y:0});
directions.push({direction:'nw', x: -1, y:-1});
directions.push({direction:'ne', x: 1, y:-1});
const input = shared.getInput()
                    .map(getPath);

const black = [];
input.forEach(path=>{
    let tile = {x:0, y:0};
    path.forEach(step=>{
        direction = directions.find(d=>d.direction===step);
        tile.x+=direction.x;
        tile.y+=direction.y;
    });
    const index = black.findIndex(t=>t.x===tile.x&&t.y===tile.y);
    if (index<0) {
        black.push(tile);
    } else {
        black.splice(index, 1);
    }
})
answer=black.length;
shared.end(answer);

function getPath(line) {
    const characters = line.split('');
    const path = [];
    let last = '';
    characters.forEach(c=> {
        last+=c;
        if (directions.find(d=>d.direction===last)) {
            path.push(last);
            last='';
        }
    });
    return path;
}
