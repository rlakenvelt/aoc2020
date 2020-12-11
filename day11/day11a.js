
const { getgid } = require('process');
const { gridDirections } = require('../common/base.js');
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 11A");
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
    for (let y = 0; y < GRIDHEIGH; y++) {
        for (let x = 0; x < GRIDWIDTH; x++) {
            if (grid[y][x]===FLOOR) continue;
            occupied = direction.reduce((total, dir) => {
                                    if (outOfBounds(x, y, dir)) return total;
                                    if (grid[y+dir.y][x+dir.x] === OCCUPIED) {
                                        total++;
                                    }
                                    return total;
                                },0);
            if (newGrid[y][x] === OCCUPIED && occupied>=4) {
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
while (gridChanged);

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


