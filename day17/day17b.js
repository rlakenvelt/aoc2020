
const shared = require('../common/base.js');
const directions = [];
for (let x=-1; x<=1; x++) {
    for (let y=-1; y<=1; y++) {
        for (let z=-1; z<=1; z++) {
            for (let w=-1; w<=1; w++) {
                if (x==0&&y==0&z===0&&w===0) continue;
                directions.push({x: x, y: y, z:z, w: w});
            }
        }
    }
}

let answer = 0;
shared.start("day 17B");
let inputgrid = shared.getGrid();

let grid = [];
for (let i=0; i<13; i++) {
    const square = Array(20).fill('.').map(()=>Array(20).fill('.').map(()=>Array(20).fill('.')));
    grid.push(square);
}
for (let y=0; y<inputgrid.length; y++) {
    for (let x=0; x<inputgrid[y].length; x++) {
        grid[6][6][y+6][x+6] = inputgrid[y][x];
    }
}


for (let cycle=1; cycle<=6; cycle++) {
    gridcopy = copy4DGrid(grid);

    let count = 0;
    for (let x=0; x<grid[0][0][0].length; x++) {
        for (let y=0; y<grid[0][0].length; y++) {
            for (let z=0; z<grid[0].length; z++) {
                for (let w=0; w<grid.length; w++) {
                    const active = directions.reduce((total, direction) => {
                                            if (isActive(x+direction.x, y+direction.y, z+direction.z, w+direction.w)) total++;
                                            return total;
                                          }, 0);                        
                    if (isActive(x, y, z, w) && (active<2||active>3)) {
                        gridcopy[w][z][y][x] = '.';
                    } else 
                    if (active===3) {
                        gridcopy[w][z][y][x] = '#';
                    }
                }
            }
        }
    }
    grid = gridcopy;
}


for (let x=0; x<grid[0][0][0].length; x++) {
    for (let y=0; y<grid[0][0].length; y++) {
        for (let z=0; z<grid[0].length; z++) {
            for (let w=0; w<grid.length; w++) {
                if (isActive(x,y,z, w)) answer++;
            }
        }
    }
}
shared.end(answer);

function isActive(x, y, z, w) {
    if (!grid[w]) return false;
    if (!grid[w][z]) return false;
    if (!grid[w][z][y]) return false;
    const cell = grid[w][z][y][x];
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

function copy4DGrid (fourDgrid) {
    const copied4DGrid = [];
    fourDgrid.forEach(grid => {
        const copiedGrid = copyGrid(grid);
        copied4DGrid.push(copiedGrid)
    });
    return copied4DGrid;
}
