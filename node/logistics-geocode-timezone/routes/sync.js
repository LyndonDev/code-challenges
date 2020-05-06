const express = require('express');

const sync = require('../controllers/sync');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/syncData', (req, res) => {
  sync.syncShipmentData()
    .then(detail => res.status(201).json({ data: { detail } }))
    .catch(err =>
      res.status(err.statusCode).json({ errors: [{ detail: err.detail }] }));
});

module.exports = router;
