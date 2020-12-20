
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 20A");
const tiles = shared.getInput('\n\n')
                    .map(line=>{
                        const tile = line.split('\n');
                        const tileNumber = parseInt(tile.shift().replace(':','').replace('Tile ', ''));                     
                        const grid = tile.reduce(convertToGrid, []);
                        const allBorders = [];
                        allBorders.push(calculateBorders(grid));
                        allBorders.push(calculateBorders(flipGridHorzizontal(flipGridVertical(grid))));
                        const allValues = allBorders.reduce((list,line) => {
                            list = [...list, ...line];
                            return list;
                        }, []);

                        return {tile: tileNumber, grid: grid, possibleBorderValues: [...new Set(allValues)]};
                    });

tiles.forEach(tile1 => {
    const matchesWith = [];
    tiles.forEach(tile2 => {
        if (tile1.tile!==tile2.tile) {
            const matching = compare(tile1.possibleBorderValues, tile2.possibleBorderValues);        
            if (matching.length>0) matchesWith.push(tile2.tile);
        }
    });
    tile1.matchesWith = matchesWith;
    // console.log(tile1.tile, matchesWith);
});             
answer = tiles.filter(tile=>tile.matchesWith.length===2)
             .reduce((total, tile) => {
                    total*=tile.tile;
                 return total;
             },1);      


shared.end(answer);

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
function copyGrid(grid) {
    return grid.map(x=>[...x]);
}
function compare(array1, array2) {
    const result = [];
    array1.forEach(a1=> {
        array2.forEach(a2=> {
            if (a1===a2) result.push(a1);
        })
    })
    return result;
}

function calculateBorders (grid) {
    const borders = [];
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

    return borders;
}