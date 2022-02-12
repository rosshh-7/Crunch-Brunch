const { object, ObjectId } = require('mongodb');
const errorcheck = require('./error');
const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;
const userdata = require('./users');

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
    async createReview(userId, review, rating, dateofReview) {
        try {
            const validateArgs = errorcheck.validateArgumentsCreateReview(
                arguments.length
            );
            const validateUserId = errorcheck.validateUserId(userId);
            const parsedObjectId = errorcheck.validateObjectId(validateUserId);
            const validatedReview = errorcheck.validateReview(review);
            const validatedRating = errorcheck.validateRating(rating);
            const validatedDate = errorcheck.validateDate(dateofReview);
            let newReview = {
                review_id: ObjectId(),
                reviewer_id: parsedObjectId,
                dateofReview: validatedDate,
                rating: validatedRating,
                review: validatedReview,
            };
            const userColl = await usercollection();
            const updatedInfo = await userColl.updateOne(
                { _id: ObjectId(validateUserId) },
                { $push: { reviews: newReview } }
            );
            if (updatedInfo.modifiedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    'Error: Could not add review.'
                );
            }
            return { Review_inserted: true };
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getAllReviews() {
        try {
            const userColl = await usercollection();
            const updatedInfo = await userColl.find({}).toArray();
            
            let arr = [];
            for(let i = 0;i<updatedInfo.length; i++){
                for(let j = 0;j<updatedInfo[i].reviews.length; j++){
                    arr.push(updatedInfo[i].reviews[j])
                }
            }
            return arr;
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getAllReviewsByUserId(userId) {
        try {
            if (!userId)
                throwError(ErrorCode.NOT_FOUND, 'Error: Provide an userId');
            const validateUserId = errorcheck.validateUserId(userId);
            const user = await userdata.getUserById(userId);
            if (!user)
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No reviews found with given Id.'
                );
            // if (user.hasOwnProperty('reviews') && user.reviews.length < 1) {
            //     throwError(ErrorCode.NOT_FOUND, 'Error: No reviews found.');
            // }

            let result = user.reviews;

            result.forEach((element) => {
                element.review_id = element.review_id.toString();
            });
            return result;
        } catch (error) {
            throwCatchError(error);
        }
    },

    async getReviewByReviewId(reviewId) {
        try {
            const validatedId = errorcheck.validateReviewId(reviewId);
            const parsedObjectId = errorcheck.validateObjectId(validatedId);
            const userColl = await usercollection();
            const reviewResult = await userColl.findOne(
                {
                    'reviews.review_id': ObjectId(parsedObjectId),
                },
                {
                    projection: {
                        _id: 0,
                        'reviews.$': 1,
                    },
                }
            );

            if (!reviewResult) {
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No review found with given id.'
                );
            }

            const [review] = reviewResult.reviews;

            review.review_id = review.review_id.toString();

            return review;
        } catch (error) {
            throwCatchError(error);
        }
    },
    async removeReviewById(reviewId) {
        try {
            const validatedId = errorcheck.validateReviewId(reviewId);

            const parsedObjectId = errorcheck.validateObjectId(validatedId);

            const userColl = await usercollection();

            const restaurantWithReview = await userColl.findOne({
                'reviews.review_id': parsedObjectId,
            });

            const deleteReview = await userColl.updateMany(
                {},
                { $pull: { reviews: { review_id: ObjectId(validatedId) } } }
            );
            if (!deleteReview) {
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No review with that id.'
                );
            }
            if (deleteReview.modifiedCount === 0)
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    'Error: Could not delete review.'
                );
            else return { reviewId: reviewId, deleted: true };
        } catch (error) {
            throwCatchError(error);
        }
    },
};
const throwError = (code = 404, message = 'Not found') => {
    throw { code, message };
};
const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Error: Internal server error.'
    );
};
