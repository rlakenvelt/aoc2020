// Using object instead of arrays because of performance
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 24B");
const directions = [];
directions.push({direction:'e', x: 2, y:0});
directions.push({direction:'se', x: 1, y:1});
directions.push({direction:'sw', x: -1, y:1});
directions.push({direction:'w', x: -2, y:0});
directions.push({direction:'nw', x: -1, y:-1});
directions.push({direction:'ne', x: 1, y:-1});
const input = shared.getInput()
                    .map(getPath);
const DAYS=100;
let allTiles = getBaseTiles(input);

for (let day=1; day<=DAYS; day++) {
    const newTiles = {...allTiles};
    Object.keys(allTiles)
          .forEach(hash=>{
                const tile = tileFromHash(hash);
                if (allTiles[hash]==='black') {
                    directions.forEach(direction=> {
                        const checkHash = getHash({x: tile.x+direction.x, y: tile.y+direction.y, color: 0});
                        if (!newTiles[checkHash]) {
                            newTiles[checkHash]='white';
                        }
                    })
                }

           });
    Object.keys(newTiles)
          .forEach(hash=> {
                let black=0;
                const tile = tileFromHash(hash);
                const color = newTiles[hash];
                directions.forEach(direction=> {
                    const checkTile = {x: tile.x+direction.x, y: tile.y+direction.y}
                    const checkHash = getHash(checkTile);
                    if (allTiles[checkHash]==='black') black++;
                })     
                if (newTiles[hash]==='white') {
                    if (black===2) newTiles[hash]='black';
                }  else {
                    if (black===0||black>2) newTiles[hash]='white';
                }
          })
    allTiles=newTiles;
}

answer=countBlack(allTiles);
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

function countBlack(tiles) {
    let total=0;
    Object.keys(tiles)
          .forEach(hash=> {   
              if (tiles[hash]==='black') total++; 
          })
    return total;

}

function getBaseTiles(input) {
    const pattern = {};
    input.forEach(path=>{
        let tile = {x:0, y:0};
        path.forEach(step=>{
            direction = directions.find(d=>d.direction===step);
            tile.x+=direction.x;
            tile.y+=direction.y;
        });
        const hash = getHash(tile);
        if (pattern[hash]) {
            pattern[hash]=pattern[hash]==='black'?'white':'black';
        } else {
            pattern[hash]='black';
        }
    })
    return pattern;
}
function getHash(tile) {
    return tile.x.toString() +'|' + tile.y.toString();
}
function tileFromHash(hash) {
    const coordinates = hash.split('|');
    return {x: parseInt(coordinates[0]), y: parseInt(coordinates[1])};
}
