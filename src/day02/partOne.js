const fs = require('fs');

const partOne = (file = 'input.txt') => {
  const words = fs.readFileSync(file, 'utf8').split('\n');
  let totalTwoCount = 0;
  let totalThreeCount = 0;

  words.forEach((word) => {
    if (word === '') return;
    const letterCounts = {};
    let validTwoCount = 0;
    let validThreeCount = 0;

    for (let i = 0; i < word.length; i++) {
      if (!letterCounts[word[i]]) letterCounts[word[i]] = 0;
      letterCounts[word[i]]++;
    }

    Object.keys(letterCounts).forEach((letter) => {
      if (letterCounts[letter] === 2) {
        validTwoCount = 1;
      } else if (letterCounts[letter] === 3) {
        validThreeCount = 1;
      }
    });

    totalTwoCount += validTwoCount;
    totalThreeCount += validThreeCount;
  });

  return totalTwoCount * totalThreeCount;
};

console.log(partOne());
