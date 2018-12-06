const fs = require('fs');

const partOne = (file = 'input.txt') => {
  const coordianteStrings = fs.readFileSync(file, 'utf8').split('\n');
  const coordinates = [];
  const hasInfinite = {};
  const territory = {};
  const skip = [];
  let max;
  let maxRow = 0;
  let maxCol = 0;

  coordianteStrings.forEach((coordianteString, i) => {
    if (coordianteString === '') return;
    const coordinate = coordianteString.split(',');
    const row = parseInt(coordinate[1]);
    const col = parseInt(coordinate[0]);
    coordinates.push([row, col]);

    if (!skip[row]) skip[row] = {};
    skip[row][col] = true;

    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
  });

  const getDistance = (a, b) => Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]);

  for (let i = 0; i <= maxRow; i++) {
    for (let j = 0; j <= maxCol; j++) {
      if (skip[i] && skip[i][j]) continue;
      let min;
      let minKey;
      let tie = false;

      coordinates.forEach((coordinate, k) => {
        const distance = getDistance([i, j], coordinate);

        if (!min || distance < min) {
          min = distance;
          minKey = k;
          tie = false;
        } else if (distance === min) {
          tie = true;
        }
      });

      if (tie) continue;

      if (!territory[minKey]) territory[minKey] = 0;
      territory[minKey]++;

      if (i === 0 || i === maxRow || j === 0 || j === maxCol) {
        hasInfinite[minKey] = true;
      }
    }
  }

  Object.keys(territory).forEach((k) => {
    if (hasInfinite[k]) return;
    if (!max || territory[k] + 1 > max) max = territory[k] + 1;
  });

  return max;
}

console.log(partOne());
