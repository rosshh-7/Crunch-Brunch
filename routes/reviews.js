const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const reviewData = data.reviews;
const xss = require('xss');
const errorcheck = data.error;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
// router.post('/newreview', async (req, res) => {
//     try {
//         let userId = req.body['userId'];
//         let review = req.body['review'];
//         let rating = parseInt(req.body['rating']);

//         const validateduserId = errorcheck.validateUserId(userId);
//         const validatedreview = errorcheck.validateReview(review);
//         const validatedrating = rating;

//         const current_datetime = new Date();
//         const formatted_date =
//             current_datetime.getMonth() +
//             1 +
//             '/' +
//             current_datetime.getDate() +
//             '/' +
//             current_datetime.getFullYear();
//         const createReview = await reviewData.createReview(
//             validateduserId,
//             validatedreview,
//             validatedrating,
//             formatted_date
//         );
//         res.redirect('/users/profile');
//     } catch (error) {
//         res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
//             serverResponse: error.message || 'Internal server error.',
//         });
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const validateduserId = errorcheck.validateUserId(req.params.id);
        const reviewByUserId = await reviewData.getAllReviewsByUserId(
            validateduserId
        );
        res.json(reviewByUserId);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

router.get('/review/:id', async (req, res) => {
    try {
        const validatedrevId = errorcheck.validateReviewId(req.params.id);
        const reviewByreviewId = await reviewData.getReviewByReviewId(
            validatedrevId
        );
        res.json(reviewByreviewId);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const validatedrevId = errorcheck.validateReviewId(req.params.id);
        let deleteReview = await reviewData.removeReviewById(validatedrevId);
        res.json(deleteReview);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

module.exports = router;
