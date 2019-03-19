const express = require('express');
const router = express.Router();

router.use('/url/', require('./url'));

// api home page
router.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

// api home page
router.post('*', (req, res) => {
    res.status(404).send('404 not found');
});

module.exports = router;

module.exports = router;