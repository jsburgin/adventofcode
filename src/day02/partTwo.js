const fs = require('fs');

const partTwo = (file = 'input.txt') => {
  const words = fs.readFileSync(file, 'utf8').split('\n');

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) continue;
      let diff = 0;
      let same = [];

      for (let k = 0; k < words[i].length; k++) {
        if (words[i][k] !== words[j][k]) {
          diff++;
          if (diff > 1) break;
        } else {
          same.push(words[i][k]);
        }
      }

      if (diff === 1) return same.join('');
    }
  }

  return -1;
}

console.log(partTwo());
