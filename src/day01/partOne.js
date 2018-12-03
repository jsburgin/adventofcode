const fs = require('fs');

const partOne = (file = 'input.txt') => {
  const frequencyStrings = fs.readFileSync(file, 'utf8').split('\n');
  let sum = 0;

  frequencyStrings.forEach((frequencyString) => {
    if (frequencyString === '') return;
    const frequency = parseInt(frequencyString);
    sum += frequency;
  });

  return sum;
};

console.log(partOne());
