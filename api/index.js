'use strict';

const router = require('express').Router();

router.use('/health', require('./health'));
router.use('/stats', require('./stats'));

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
