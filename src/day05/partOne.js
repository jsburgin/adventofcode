const fs = require('fs');

const partOne = (file = 'input.txt', polymer = null) => {
  if (!polymer) {
    polymer = fs.readFileSync(file, 'utf8').split('');
  }

  const isUpper = (character) => character === character.toUpperCase();
  const isLower = (character) => character === character.toLowerCase();

  for (let i = 1; i < polymer.length; i++) {
    const reacts = (isLower(polymer[i]) && polymer[i - 1] === polymer[i].toUpperCase()) ||
      (isUpper(polymer[i]) && polymer[i - 1] === polymer[i].toLowerCase());

    if (reacts) {
      polymer.splice(i - 1, 2);
      i -= 2;
    }
  }

  return polymer.length - 1;
};

console.log(partOne())
module.exports = partOne;
