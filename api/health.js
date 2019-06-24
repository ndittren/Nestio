'use strict';

const express = require('express');
const router = express.Router();
const {avg, queue} = require('./funcs');

// Expose an /health end-point that:
// Whenever the average altitude of the satellite goes below 160km for more than 1 minute, returns the message “WARNING: RAPID ORBITAL DECAY IMMINENT”
// Once the average altitude of the satellite returns to 160km or above, return the message “Sustained Low Earth Orbit Resumed” for 1 minute.
// Otherwise return the message “Altitude is A-OK”

let status = false;

const warning = arr => {
  if (arr.length % 6 === 0 && avg(arr) < 160) {
    status = true;
    return 'WARNING: RAPID ORBITAL DECAY IMMINENT';
  }
  if (status === true && avg(arr) > 160) {
    status = false;
    return 'Sustained Low Earth Orbit Resumed';
  } else {
    return 'Altitude is A-OK';
  }
};

router.get('/', async (req, res, next) => {
  try {
    const health = await warning(queue);

    res.json(health);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
