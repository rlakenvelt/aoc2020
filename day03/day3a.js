const shared = require('../common/base.js');

let answer = 0;

shared.start("day 3A");
const rows = shared.getInput();
const trees = rows.map(row => row.repeat(Math.ceil((3 * rows.length + 1) / (rows[0].length))))
                  .reduce((treelist, row) => {
    treelist.push(row.split(''));
    return treelist;
}, []);                  


for (var row = 1; row < rows.length; row +=1){
    if (trees[row][row*3] === '#') answer++;

}
shared.end(answer);



