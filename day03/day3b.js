const shared = require('../common/base.js');

shared.start("day 3B");

const rows = shared.getInput();
const trees = rows.map(row => row.repeat(Math.ceil((7 * rows.length + 1) / (rows[0].length))))
                  .reduce((treelist, row) => {
    treelist.push(row.split(''));
    return treelist;
}, []);                  

let answer = counttrees(1, 1) * counttrees(3, 1) * counttrees(5, 1) * counttrees(7, 1) * counttrees(1, 2);  

shared.end(answer);

function counttrees(right, down) {
    let count = 0;
    for (var step = 1; step < rows.length / down; step +=1){
        if (trees[step*down][step*right] === '#') count++;
    }
    return count;
}

