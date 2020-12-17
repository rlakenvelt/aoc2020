
const shared = require('../common/base.js');
const directions = [];
for (let x=-1; x<=1; x++) {
    for (let y=-1; y<=1; y++) {
        for (let z=-1; z<=1; z++) {
            if (x==0&&y==0&z===0) continue;
            directions.push({x: x, y: y, z:z});
        }
    }
}

let answer = 0;
shared.start("day 17A");
let inputgrid = shared.getGrid();

let grid = [];
for (let i=0; i<13; i++) {
    const square = Array(20).fill('.').map(()=>Array(20).fill('.'));
    grid.push(square);
}
for (let y=0; y<inputgrid.length; y++) {
    for (let x=0; x<inputgrid[y].length; x++) {
        grid[6][y+6][x+6] = inputgrid[y][x];
    }
}

for (let cycle=1; cycle<=6; cycle++) {
    gridcopy = copyGrid(grid);
    let count = 0;
    for (let x=0; x<grid[0][0].length; x++) {
        for (let y=0; y<grid[0].length; y++) {
            for (let z=0; z<grid.length; z++) {
                const active = directions.reduce((total, direction) => {
                                            if (isActive(x+direction.x, y+direction.y, z+direction.z)) total++;
                                            return total;
                                          }, 0);
                        
                if (isActive(x, y, z) && (active<2||active>3)) {
                    gridcopy[z][y][x] = '.';
                } else 
                if (active===3) {
                    gridcopy[z][y][x] = '#';
                }
            }
        }
    }
    grid = gridcopy;
}


for (let x=0; x<grid[0][0].length; x++) {
    for (let y=0; y<grid[0].length; y++) {
        for (let z=0; z<grid.length; z++) {
            if (isActive(x,y,z)) answer++
        }
    }
}
shared.end(answer);

function isActive(x, y, z) {
    if (!grid[z]) return false;
    if (!grid[z][y]) return false;
    const cell = grid[z][y][x];
    return (cell==='#');    
}

function copyGrid (basegrid) {
    const copiedGrid = [];
    basegrid.forEach(layer => {
        const copiedLayer = [...layer].map(row => [...row])
        copiedGrid.push(copiedLayer)
    });
    return copiedGrid;
}

