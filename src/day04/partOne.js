const fs = require('fs');

const partOne = (file = 'input.txt') => {
  const entries = fs.readFileSync(file, 'utf8').split('\n');
  const sleepMap = {};
  let guard;
  let sleepsAt;
  entries.pop();

  const getTimeInMilliseconds = (entry) => {
    return new Date(entry.match(/\[(.*?)\]/)[1]).getTime();
  };

  entries.sort((a, b) => (getTimeInMilliseconds(a) - getTimeInMilliseconds(b)));

  for (let i = 0; i < entries.length; i++) {
    const parsedNums = entries[i].match(/\d+/g);
    const parsedWords = entries[i].split(' ');

    if (parsedWords[2] === 'Guard') {
      guard = parsedNums[5];
    } else if (parsedWords[2] === 'falls') {
      sleepsAt = parseInt(parsedNums[4]);
    } else if (parsedWords[2] === 'wakes') {
      if (!sleepMap[guard]) {
        sleepMap[guard] = {
          totalMins: 0,
          breakdown: {},
        };
      }

      for (let j = sleepsAt; j < parseInt(parsedNums[4]); j++) {
        sleepMap[guard].totalMins++;
        if (!sleepMap[guard].breakdown[j]) {
          sleepMap[guard].breakdown[j] = 0;
        }
        sleepMap[guard].breakdown[j]++;
      }
    }
  }

  let max = -1;
  let maxGuard;
  Object.keys(sleepMap).forEach((key) => {
    const sleepTime = sleepMap[key];
    if (sleepTime.totalMins > max) {
      max = sleepTime.totalMins;
      maxGuard = key;
    }
  });

  max = -1;
  let maxMinute;
  Object.keys(sleepMap[maxGuard].breakdown).forEach((minute) => {
    if (sleepMap[maxGuard].breakdown[minute] > max) {
      max = sleepMap[maxGuard].breakdown[minute];
      maxMinute = minute;
    }
  });

  return maxMinute * maxGuard;
};

console.log(partOne());
