const fs = require('fs');

const partOne = (file = 'input.txt') => {
  const fabric = {};
  const entries = fs.readFileSync(file, 'utf8').split('\n');
  let overlap = 0;

  const claimFabric = (row, col) => {
    if (!fabric[row]) fabric[row] = {};

    switch(fabric[row][col]) {
      case 1:
        fabric[row][col] = 2;
        overlap++;
        break;
      case 2:
        break;
      default:
        fabric[row][col] = 1;
    }
  };

  entries.forEach((entry) => {
    if (entry === '') return;
    const parsed = entry.match(/\d+/g);
    const startRow = parseInt(parsed[1]) - 1;
    const startCol = parseInt(parsed[2]) - 1;
    const rows = parseInt(parsed[3]);
    const cols = parseInt(parsed[4]);

    for (let i = startRow; i < startRow + rows; i++) {
      for (let j = startCol; j < startCol + cols; j++) {
        claimFabric(i, j);
      }
    }
  });

  return overlap;
};

console.log(partOne());
