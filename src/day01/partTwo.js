const fs = require('fs');

const partTwo = (file = 'input.txt') => {
  const frequencyStrings = fs.readFileSync(file, 'utf8').split('\n');
  let sum = 0;
  let dups = {};
  let found = false;

  while (!found) {
    for (let i = 0; i < frequencyStrings.length; i++) {
      const frequencyString = frequencyStrings[i];
      if (frequencyString === '') continue;
      const frequency = parseInt(frequencyString);

      sum += frequency;

      if (dups[sum]) {
        return sum;
      }

      dups[sum] = true;
    }
  }

  return -1;
};

console.log(partTwo());
