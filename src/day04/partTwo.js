const fs = require('fs');

const partTwo = (file = 'input.txt') => {
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
  let maxMin;
  let maxGuard;
  Object.keys(sleepMap).forEach((guard) => {
    Object.keys(sleepMap[guard].breakdown).forEach((minute) => {
      if (sleepMap[guard].breakdown[minute] > max) {
        max = sleepMap[guard].breakdown[minute];
        maxMin = minute;
        maxGuard = guard;
      }
    });
  });

  return maxMin * maxGuard;
};

console.log(partTwo());
