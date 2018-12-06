const fs = require('fs');

const partTwo = (file = 'input.txt') => {
  const coordianteStrings = fs.readFileSync(file, 'utf8').split('\n');
  const coordinates = [];
  let size = 0;
  let maxRow = 0;
  let maxCol = 0;

  coordianteStrings.forEach((coordianteString, i) => {
    if (coordianteString === '') return;
    const coordinate = coordianteString.split(',');
    const row = parseInt(coordinate[1]);
    const col = parseInt(coordinate[0]);
    coordinates.push([row, col]);

    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
  });

  const getDistance = (a, b) => Math.abs(a[1] - b[1]) + Math.abs(a[0] - b[0]);

  for (let i = 0; i <= maxRow; i++) {
    for (let j = 0; j <= maxCol; j++) {
      const distance = coordinates.reduce((dis, coor) => {
        return dis + getDistance([i, j], coor);
      }, 0);
      if (distance < 10000) size++;
    }
  }

  return size;
}

console.log(partTwo());
