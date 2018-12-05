const fs = require('fs');
const partOne = require('./partOne');

const partTwo = (file = 'input.txt') => {
  const polymer = fs.readFileSync(file, 'utf8').split('');
  const letters = new Set();
  let minLength = -1;

  polymer.forEach((letter) => { letters.add(letter) });

  letters.forEach((letter) => {
    const cleanedPolymer = [];
    for (let i = 0; i < polymer.length; i++) {
      if (polymer[i].toLowerCase() !== letter) {
        cleanedPolymer.push(polymer[i]);
      }
    }

    const length = partOne(null, cleanedPolymer);
    if (minLength === -1) {
      minLength = length;
      return;
    }

    if (length < minLength) minLength = length;
  });

  return minLength;
};

console.log(partTwo());
