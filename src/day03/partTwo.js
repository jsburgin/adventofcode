const fs = require('fs');

const partTwo = (file = 'input.txt') => {
  const fabric = {};
  const isValid = {};
  const entries = fs.readFileSync(file, 'utf8').split('\n');

  const claimFabric = (row, col, id) => {
    if (!fabric[row]) fabric[row] = {};

    if (fabric[row][col] > 0) {
      isValid[fabric[row][col]] = false;
      isValid[id] = false;
      fabric[row][col] = -1;
    } else if (fabric[row][col] === -1) {
      isValid[id] = false;
    } else {
      fabric[row][col] = id;
    }
  };

  for (let i = 0; i < entries.length; i++) {
    if (entries[i] === '') continue;
    const parsed = entries[i].match(/\d+/g);
    const id = parsed[0];
    const startRow = parseInt(parsed[1]) - 1;
    const startCol = parseInt(parsed[2]) - 1;
    const rows = parseInt(parsed[3]);
    const cols = parseInt(parsed[4]);
    isValid[id] = true;

    for (let i = startRow; i < startRow + rows; i++) {
      for (let j = startCol; j < startCol + cols; j++) {
        claimFabric(i, j, id);
      }
    }
  }

  for (let i = 0; i < entries.length; i++) {
    if (isValid[i + 1]) return i + 1;
  }

  return -1;
};

console.log(partTwo());
