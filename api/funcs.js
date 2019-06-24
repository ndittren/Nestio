'use strict';

const fetch = require('node-fetch');

let queue = [];

//This function fetches the altitude data from the api and pushes it to an array that is acting as a queue. Once the length of the queue reaches 30 (five minutes of data), it pushes out the first entry as a new one comes in.
const getInfo = async () => {
  try {
    const response = await fetch('http://nestio.space/api/satellite/data');
    const info = await response.json();
    const altitude = info.altitude;
    queue.push(altitude);
    if (queue.length > 30) {
      queue.shift();
    }
    console.log(queue);
  } catch (err) {
    console.error(err);
  }
};

//Data is collected every 10 seconds, the amount of time it takes the nestio api to update.
setInterval(getInfo, 10000);

module.exports = {
  //Calculates the maximum number in the queue
  max(arr) {
    return Math.max(...arr);
  },

  //Calculates the minimum number in the queue
  min(arr) {
    return Math.min(...arr);
  },

  //Calculates the average of the queue
  avg(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total / arr.length;
  },
  queue
};
