const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const userData = data.user;
const signupData = data.signup;
const orderData = data.cart;
const menuData = data.menu;
const xss = require('xss');
const moment = require('moment');
const errorcheck = data.error;
const favData = data.favorites;
const reviewsRoutes = require('./reviews');
const reviewData = data.reviews;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

router.get('/', async (req, res) => {
    try {
        const getAllUsers = await userData.getAllUsers();
        res.json(getAllUsers);
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || 'Internal server error.',
        });
    }
});

router.post('/profile', async (req, res) => {
    try {
        let userId = req.body['userId'];
        let review = req.body['review'];
        let rating = parseInt(req.body['rating']);

        const validateduserId = errorcheck.validateUserId(userId);
        const validatedreview = errorcheck.validateReview(review);
        const validatedrating = rating;

        const current_datetime = new Date();
        const formatted_date =
            current_datetime.getMonth() +
            1 +
            '/' +
            current_datetime.getDate() +
            '/' +
            current_datetime.getFullYear();
        const createReview = await reviewData.createReview(
            validateduserId,
            validatedreview,
            validatedrating,
            formatted_date
        );
        res.redirect('./profile');
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR);
        res.render('pages/userprofile', { errors: error.message });
        //res.redirect('./profile');
    }
});

router.get('/profile', async (req, res) => {
    if (req.session.user) {
        try {
            let userId = xss(req.session.user.userId);
            const validateduserId = errorcheck.validateUserId(userId);
            let getUserById = await userData.getUserById(userId);
            let getOrder = await orderData.getOrderByUserId(userId);
            // let getMenuFav=await orderData.getItemDetailsById(id)
            let allfav = await favData.getAllfavorite(userId);

            let rarr = await reviewData.getAllReviewsByUserId(userId);

            if (allfav.length > 0) {
                let json = [];
                for (let i = 0; i < allfav.length; i++) {
                    let menudetails = await menuData.getMenuItem(
                        allfav[i].foodId.toString()
                    );
                    if (menudetails != null) {
                        json.push(menudetails);
                    }
                }

                if (getOrder.length > 0) {
                    res.render('pages/userprofile', {
                        data: getUserById,
                        getOrder,
                        json,
                        id: req.session.user.userId,
                        rarr,
                    });
                } else {
                    res.render('pages/userprofile', {
                        data: getUserById,
                        json,
                        noorder: 'No Order placed by user',
                        id: req.session.user.userId,
                        rarr,
                    });
                }
            } else {
                if (getOrder.length > 0) {
                    res.render('pages/userprofile', {
                        data: getUserById,
                        getOrder,
                        nofav: 'No Fav item added by user yet',
                        id: req.session.user.userId,
                        rarr,
                    });
                } else {
                    res.render('pages/userprofile', {
                        data: getUserById,
                        noorder: 'No Order placed by user',
                        nofav: 'No Fav item added by user yet',
                        id: req.session.user.userId,
                        rarr,
                    });
                }
            }
        } catch (error) {
            res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
                serverResponse: error.message || 'Internal server error.',
            });
        }
    } else {
        res.render('pages/errors', {
            errors: 'You must be logged-in to Acess this page',
        });
    }
});

router.get('/myprofile', async (req, res) => {});
router.post('/myprofile', async (req, res) => {});
router.get('/signup', async (req, res) => {
    res.render('pages/signupform');
});
router.post('/orderDetails', async (req, res) => {
    let orderid = req.body['orderid'];
    let getcart = await orderData.getCartByOrderId(orderid);

    let itemdetails = [];
    for (let i = 0; i < getcart.length; i++) {
        let json = {
            quantity: getcart[i].quantity,
            name: getcart[i].details.title,
        };
        itemdetails.push(json);
    }
    res.render('pages/orderdetails', { itemdetails });
});
module.exports = router;
