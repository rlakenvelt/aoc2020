
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 20B");
const tiles = shared.getInput('\n\n')
                    .map(line=>{
                        const tile = line.split('\n');
                        const tileNumber = parseInt(tile.shift().replace(':','').replace('Tile ', ''));                     
                        const grid = tile.reduce(convertToGrid, []);
                        const borders = calculateBorders(grid);
                        return {tile: tileNumber, grid: grid, borders: borders};
                    });
const pattern = shared.getGrid('\n', 'pattern');
const monster = [];
for (let y=0; y<pattern.length; y++) {
    for (let x=0; x<pattern[0].length; x++) {
        if (pattern[y][x]==='#') {
            monster.push({x, y});
        }
    }
}

const TILESIZE = tiles[0].grid.length;
tiles.forEach(tile1 => {
    const matchesWith = [];
    tiles.forEach(tile2 => {
        if (tile1.tile!==tile2.tile) {           
            const matching = compare(tile1.borders, tile2.borders);          
            if (matching>=0) matchesWith.push({tile: tile2.tile, side: matching});
        }
    });
    tile1.matchesWith = matchesWith;
});   

// Get top-left corner
let tile = topLeftCorner();
let tileGrid = [[tile]];
let line = 0;
let done = false;
while (!done) {
    let matchingValue = tile.borders[1][0];
    let nextTile = tile.matchesWith.filter(m=>m.side===1)[0];
    if (!nextTile) {
        tile=tileGrid[line][0];
        matchingValue = tile.borders[2][0];
        nextTile = tile.matchesWith.filter(m=>m.side===2)[0];        
        if (!nextTile) {
            done=true;
            break;
        }
        tile = getTile(nextTile.tile);
        tile = transformTileToFit(tile, 0, matchingValue);
        tileGrid.push([tile]);
        line++;
        continue;
    }
    tile = getTile(nextTile.tile);
    tile = transformTileToFit(tile, 3, matchingValue);
    tileGrid[line].push(tile);
}

let fullGrid = composeFullGrid(tileGrid);
let rotations = 0;
let flipped = false;
while (countMonstersInGrid(fullGrid).length===0) {
    if (rotations<4) {
        fullGrid=rotateGrid(fullGrid);
        rotations++;
    } else 
    if (!flipped) {
        fullGrid=flipGridHorzizontal(fullGrid);
        rotations=0;
        flipped=true;
    } 

}

const monsters=countMonstersInGrid(fullGrid);
markMonstersInGrid(fullGrid);
// shared.showGrid(fullGrid);

answer = fullGrid.map(line=>line.join(''))
                 .reduce((string, line, index) => {
                             string+=line;
                             return string;
                 }, '')
                 .replace(/\./g, '')
                 .replace(/O/g, '')
                 .length;

shared.end(answer);

function countMonstersInGrid(grid) {
    let monsters = [];
    const max = monster.reduce((m, cell) => {
        m = Math.max(m, cell.x);
        return m;
    }, 0);
    for (let y=1; y<grid.length-1; y++) {
        for (let x=0; x<grid[0].length-max; x++) {
            let found = true;
            for (let i=0; i<monster.length&&found; i++) {
                if (grid[y+monster[i].y][x+monster[i].x]!=='#') found=false;
            }
            if (found) monsters.push({x, y});
        }
    }
    return monsters;
}

function markMonstersInGrid(grid) {
    monsters.forEach(start=> {
        monster.forEach(point=> {
            fullGrid[start.y+point.y][start.x+point.x]='O';
        })
    });
}


function topLeftCorner () {
    let corner = copyTile(tiles.filter(tile=>tile.matchesWith.length===2)[0]);

    // Rotate corner tile until it fits in top-left corner
    while (!(corner.matchesWith.some(tile=>tile.side===1) && corner.matchesWith.some(tile=>tile.side===2))) {
        corner=rotateTile(corner);
    };
    return corner;
}

function convertToGrid (list, row) {
    list.push(row.split('')
                 .reduce((list, value) => {
                    list.push(value)
                    return list;
                 }, []));
    return list;
}

function flipGridHorzizontal(grid) {
    return copyGrid(grid).map(line=> line.reverse());
}
function flipGridVertical(grid) {
    return copyGrid(grid).reverse();
}

function transformTileToFit(tile, side, value) {
    let count = 1;
    // Rotate tile until it fits in top-left corner
    while (!tile.borders[side].includes(value)&&count<4) {
        tile=rotateTile(tile);
        count++;
    }; 
    if (tile.borders[side][0]!==value) {
        if (side===0) {
            tile = flipTileHorizonal(tile);
        } else {
            tile = flipTileVertical(tile);
        }
    };
    return tile;   
}

function showTile(tile) {
    console.log('\nTILE', tile.tile);
    shared.showGrid(tile.grid);
    // console.log('BORDERS', tile.borders);
    // console.log('MATCHES', tile.matchesWith);
}

function composeFullGrid(tilegrid) {
    let fullGrid = new Array(TILESIZE*tileGrid.length).fill([]);
    tileGrid.forEach((tileline,i1)=> {
        tileline.forEach(tile => {
            tile.grid.forEach((p, i2) => {
                if (i2>0&&i2<TILESIZE-1) {
                    const part = [...p];
                    part.shift();
                    part.pop();
                    fullGrid[i1*TILESIZE+i2] = [...fullGrid[i1*TILESIZE+i2], ...part];
                }
            });
        });
    });
    fullGrid = fullGrid.filter(line=>line.length>1);
    return fullGrid;
}

function rotateGrid(grid) {
    const size = grid.length;
    let newGrid = new Array(size);
  
    for (let y = 0; y < size; y++) {
        newGrid[y] = new Array(size);
      for (let x = 0; x < size; x++) {
        newGrid[y][x] = grid[size - 1 - x][y];
      }
    }
    return newGrid;
}
function rotateTile(tile) {
    const newTile = copyTile(tile);
    newTile.grid=rotateGrid(newTile.grid);
    newTile.borders=calculateBorders(newTile.grid);
    for (let i = 0; i<newTile.matchesWith.length; i++) {
        newTile.matchesWith[i].side++;
        if (newTile.matchesWith[i].side>3) newTile.matchesWith[i].side=0;
    }

    return newTile;
}

function getTile(tileNumber) {
    return copyTile(tiles.find(t=> t.tile===tileNumber));
}
function flipTileVertical(tile) {
    const newTile = copyTile(tile);
    newTile.grid = flipGridVertical(newTile.grid);
    newTile.borders = calculateBorders(newTile.grid); 
    for (let i = 0; i<newTile.matchesWith.length; i++) {
        if (newTile.matchesWith[i].side===2) {
            newTile.matchesWith[i].side=0;
        } else
        if (newTile.matchesWith[i].side===0) {
            newTile.matchesWith[i].side=2;
        }
    } 
    return newTile;
}
function flipTileHorizonal(tile) {
    const newTile = copyTile(tile);
    newTile.grid = flipGridHorzizontal(newTile.grid);
    newTile.borders = calculateBorders(newTile.grid); 
    for (let i = 0; i<newTile.matchesWith.length; i++) {
        if (newTile.matchesWith[i].side===3) {
            newTile.matchesWith[i].side=1;
        } else
        if (newTile.matchesWith[i].side===1) {
            newTile.matchesWith[i].side=3;
        }
    }
    return newTile;
}
function copyGrid(grid) {
    return grid.map(x=>[...x]);
}
function copyTile(tile) {
    const newTile = {tile: tile.tile};
    newTile.grid = copyGrid(tile.grid);
    newTile.borders = calculateBorders(newTile.grid);
    newTile.matchesWith = tile.matchesWith.map(match=> {
                                                return {...match};
                                          });
    return newTile;
}
function compare(array1, array2) {
    let result = -1;
    array1.forEach((a1, i1)=> {
        array2.forEach((a2, i2)=> {
            if (a1[0]===a2[0]||a1[0]===a2[1]) {
                result = i1;
            }
        })
    })
    return result;
}

function calculateBorders (grid) {
    let borders = [];
    let border;
    let borderValue;
    border = grid[0].join('').replace(/\./g, '0');
    border = border.replace(/#/g, '1');
    borderValue = parseInt(border, 2);
    borders.push(borderValue);

    border = grid.reduce((string, line) => {
        string+=line[line.length-1];
        return string;
    }, '');
    border = border.replace(/\./g, '0');
    border = border.replace(/#/g, '1');
    borderValue = parseInt(border, 2);
    borders.push(borderValue);

    border = grid[grid.length-1].join('').replace(/\./g, '0');
    border = border.replace(/#/g, '1');
    borderValue = parseInt(border, 2);
    borders.push(borderValue);


    border = grid.reduce((string, line) => {
        string+=line[0];
        return string;
    }, '');
    border = border.replace(/\./g, '0');
    border = border.replace(/#/g, '1');
    borderValue = parseInt(border, 2);
    borders.push(borderValue);

    borders=borders.map(border=> {
        const values = [border];
        const other = border.toString(2);
        const binaryValue = ('0'.repeat(10-other.length) + other);
        values.push(parseInt(binaryValue.split('').reverse().join(''), 2));
        return values;
    })

    return borders;
}