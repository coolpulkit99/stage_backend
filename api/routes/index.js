const express = require('express');
const router = express.Router();
const listRoute = require('./list');

/**
 * GET /status
 */
router.get('/api/status', (req, res) => res.send('OK'));

router.use('/api/list', listRoute);


module.exports = router;
