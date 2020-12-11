const fs = require("fs");

let starttime;
let endtime;
let puzzletitle;

const start = (puzzle) => {
  starttime = new Date();
  puzzletitle = puzzle;
};

const end = (answer) => {
  endtime = new Date();
  console.log("---------------------");
  console.log("Puzzle   :", puzzletitle);
  console.log("Answer   :", answer);
  console.log("Duration :", endtime - starttime, "ms");
  console.log("---------------------");
};

const getInput = (separator = "\n") => {
  const file = fs.readFileSync('./input.txt', "utf-8");
  return file.split(separator).map(x =>x);
};

const getNumericInput = (separator = "\n") => {
  return getInput(separator).map(x => parseInt(x));
};

const getGrid = () => {
  const rows = getInput();
  return rows.reduce((list, row) => {
      list.push(row.split('')
                   .reduce((list, value) => {
                      list.push(value)
                      return list;
                   }, []));
      return list;
  }, []);
}

const showGrid  = (grid) => {
  let rows = [...grid];
  rows.forEach((row) => {
      let showrow = row.join('');
      console.log(showrow);
  })
}

const copyGrid = (basegrid) => {
  const copiedGrid = [...basegrid].map(row => [...row])
  return copiedGrid;
}

const gridDirections = () => {
    const directions = [];
    directions.push({x: 0, y: -1});
    directions.push({x: 0, y: 1});
    directions.push({x: -1, y: 0});
    directions.push({x: 1, y: 0});
    directions.push({x: 1, y: -1});
    directions.push({x: 1, y: 1});
    directions.push({x: -1, y: -1});
    directions.push({x: -1, y: 1});
    return directions;
}

module.exports = { start, end, getInput, getNumericInput, getGrid, showGrid, copyGrid, gridDirections };

