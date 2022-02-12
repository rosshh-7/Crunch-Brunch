const path = require('path');
const adminRoutes = require('./admin');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const searchRoutes = require('./search');
const loginRoutes = require('./login');
const menuRoutes = require('./menu');
const categoryRoutes = require('./category');
const cartRoutes = require('./cart');
const cartDetailRoutes = require('./cartdetails');
const data = require('../data');
const { category } = require('../config/mongoCollections');
const { signup } = require('../data');
const signupRoutes = require('./signup');
const paymentRoutes = require('./payment');
const payRoutes = require('./paymentpage');
const bestRoutes = require('./bestseller');
const favRoutes = require('./favourite');
const userData = data.menu;
const cartData = data.cart;
const reviewData = data.reviews;
var isAdmin = false;

const constructorMethod = (app) => {
    app.get('/', async (req, res) => {
        let getCategory = await userData.getAllCategory();
        const allreviews = await reviewData.getAllReviews();
        if (req.session.user) {
            res.render('pages/index', {
                getCategory,
                data: getCategory,
                id: req.session.user.userId,
                allreviews,
            });
        } else {
            res.render('pages/index', {
                getCategory,
                data: getCategory,
                allreviews,
            });
        }
    });

    app.use('/cartpage', cartDetailRoutes);

    app.use('/admin', adminRoutes);
    app.use('/search', searchRoutes);
    app.use('/category', categoryRoutes);
    app.use('/cart', cartRoutes);
    app.get('/getCounter', async (req, res) => {
        if (req.session.user) {
            let counterValue = await cartData.getCounter(
                req.session.user.userId
            );
            res.json({ success: true, count: counterValue });
        } else {
            res.json({ success: true, count: 0 });
        }
    });

    app.get('/advertisements', async (req, res) => {
        let getCategory = await userData.getAllCategory();
        if (req.session.user) {
            let advertisement = await userData.getAdvertise();

            if (!advertisement) {
                res.render('pages/advertisements', {
                    error: 'No Advertisements Found',
                    getCategory,
                    id: req.session.user.userId,
                });
            } else {
                if (advertisement.length == 1) {
                    res.render('pages/advertisements', {
                        data1: advertisement,
                        getCategory,
                    });
                } else {
                    if (advertisement.length > 1) {
                        let advertisement2 = advertisement.slice(
                            1,
                            advertisement.length
                        );
                        let advertisement1 = [];
                        advertisement1.push(advertisement[0]);

                        res.render('pages/advertisements', {
                            data1: advertisement1,
                            data2: advertisement2,
                            getCategory,
                        });
                    }
                }
            }
        } else {
            let advertisement = await userData.getAdvertise();

            if (!advertisement) {
                res.render('pages/advertisements', {
                    error: 'No Advertisements Found',
                    getCategory,
                });
            } else {
                if (advertisement.length == 1) {
                    res.render('pages/advertisements', {
                        data1: advertisement,
                        getCategory,
                    });
                } else {
                    if (advertisement.length > 1) {
                        let advertisement2 = advertisement.slice(
                            1,
                            advertisement.length
                        );
                        let advertisement1 = [];
                        advertisement1.push(advertisement[0]);

                        res.render('pages/advertisements', {
                            data1: advertisement1,
                            data2: advertisement2,
                            getCategory,
                        });
                    }
                }
            }
        }
    });

    app.use('/cartpage', cartDetailRoutes);
    app.use('/payment', paymentRoutes);
    app.use('/paymentpage', payRoutes);
    app.use('/bestseller', bestRoutes);
    app.use('/menu', menuRoutes);
    app.use('/favourites', favRoutes);

    app.use('/users', userRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);

    app.use('/logout', async (req, res) => {
        if (req.session.admin) {
            req.session.destroy();
            res.render('pages/logout');
        } else {
            if (!req.session.user) {
                return res.render('pages/errors', {
                    errors: 'Not Authorized to access this route',
                });
            } else {
                req.session.destroy();
                // res.render('pages/logout');
                res.render('pages/logout');
            }
        }
    });

    app.get('/terms-and-conditions', async (req, res) => {
        res.render('pages/terms');
    });

    app.get('/privacy-policy', async (req, res) => {
        res.render('pages/privacy');
    });

    app.get('/admin', async (req, res) => {
        res.redirect('/admin/dashboard');
    });

    app.use('/bestseller', bestRoutes);

    //
    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Resource Not Found' });
    });
};

module.exports = constructorMethod;
