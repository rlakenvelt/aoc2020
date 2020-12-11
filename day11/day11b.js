
const { getgid } = require('process');
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 11B");
let grid = shared.getGrid();
const direction = shared.gridDirections();

let gridChanged = false;
let count = 0;
const GRIDWIDTH = grid[0].length;
const GRIDHEIGH = grid.length;
const FLOOR = '.';
const EMPTY = 'L';
const OCCUPIED = '#';
do {
    const newGrid = shared.copyGrid(grid);
    gridChanged = false;
    for (let x = 0; x < GRIDWIDTH; x++) {
        for (let y = 0; y < GRIDHEIGH; y++) {
            if (grid[y][x]==='.') continue;
            occupied = direction.reduce((total, dir) => {
                if (outOfBounds(x, y, dir)) return total;
                let stop = false;

                for (let i = 1; !stop; i++) {
                    if (x + i * dir.x < 0 || x + i * dir.x === GRIDWIDTH || y + i * dir.y < 0 || y + i * dir.y === GRIDHEIGH) {
                        break;
                    }
                    if (grid[y+i*dir.y][x+i*dir.x] === OCCUPIED) {
                        total++;
                    }
                    if (grid[y+i*dir.y][x+i*dir.x] !== FLOOR) {
                        stop=true;
                    }
                }
                return total;
            },0);
            if (newGrid[y][x] === OCCUPIED && occupied>=5) {
                newGrid[y][x] = EMPTY;
                gridChanged=true;
            } else 
            if (newGrid[y][x] === EMPTY && occupied===0) {
                newGrid[y][x] = OCCUPIED;
                gridChanged=true;
            }  
        } 
    }
    count++;
    grid = shared.copyGrid(newGrid);    
}
while (gridChanged );

answer = countTotalOccupied(grid);

shared.end(answer);

function countTotalOccupied(grid) {
    let total = 0;
    for (let x = 0; x < GRIDWIDTH; x++) {
        for (let y = 0; y < GRIDHEIGH; y++) {
            if (grid[y][x]===OCCUPIED) total++;
        }
    }
    return total;
}

function outOfBounds(x, y, direction) {
    if (x + direction.x < 0 || x + direction.x === GRIDWIDTH || y + direction.y < 0 || y + direction.y === GRIDHEIGH) return true;
    return false;
}
