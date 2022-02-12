const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const review = data.reviews;

router.get('/', async (req, res) => {
    const allreviews = await review.getAllReviews();
    allreviews.forEach((item) => {
        item.activeStar = [];
        item.star = [];
        for (let i = 0; i < item.rating; i++) {
            item.activeStar.push(true);
        }
        for (let i = 0; i < 5 - item.activeStar.length; i++) {
            item.star.push(true);
        }
    });
    if (req.session.user) {
        res.render('pages/commentlist', {
            userId: req.session.user.userId,
            allreviews,
        });
    } else {
        res.render('pages/commentlist', {
            allreviews,
        });
    }
});
module.exports = router;
