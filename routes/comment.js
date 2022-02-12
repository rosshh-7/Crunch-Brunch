const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');

router.get('/', async (req, res) => {
    res.render('pages/comment', {
        user: JSON.stringify(req.session.user)
    });
});
module.exports = router;