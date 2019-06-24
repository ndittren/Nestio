'use strict';

const express = require('express');
const router = express.Router();
const {min, max, avg, queue} = require('./funcs');

router.get('/', async (req, res, next) => {
  try {
    const maximun = await max(queue);
    const minimum = await min(queue);
    const average = await avg(queue);

    res.json({
      'This is the maximun': maximun,
      'This is the minimum': minimum,
      'This is the average': average
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
