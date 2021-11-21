const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.json(global.users));

module.exports = router;