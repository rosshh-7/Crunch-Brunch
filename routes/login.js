const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;
const errorcheck = data.error;
const xss = require('xss');
const userdata = data.user;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
router.get('/', async (req, res) => {
    let error = req.query.error;
    if (req.session.user) {
        res.redirect('/');
    } else {
        if (parseInt(error) === parseInt(1)) {
            res.render('pages/loginform', {
                cart: 'You need to be Logged-in before adding items to cart',
            });

            //res.render('pages/loginform');
        } else {
            res.render('pages/loginform');
        }
    }
});
router.post('/', async (req, res) => {
    try {
        const username = xss(req.body.username.trim().toLowerCase());
        const password = xss(req.body.password.trim());
        const validatedUsername = errorcheck.validateUsername(username);
        const validatedPassword = errorcheck.validatePassword(password);

        if (validatedUsername == 'admin' && validatedPassword == 'admin123') {
            req.session.admin = { name: 'admin' };
            return res.redirect('/admin/dashboard');
        }
        if (req.session.user) {
            auth = 'Authorised User';
            return res.redirect('/');
        } else {
            const checkuser = await loginData.checkUser(
                validatedUsername,
                validatedPassword
            );
            if (!checkuser.authenticated) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    'Internal Server Error'
                );
            }
            // if(validatedUsername=='admin'){

            // }
            const userId = await userdata.getUserId(validatedUsername);
            const userdetails = await userdata.getUserById(userId.toString());
            req.session.user = {
                username: validatedUsername,
                userId: userId,
                email: userdetails.email,
            };
            // req.session.user = user;
            return res.redirect('/');
        }
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).render(
            'pages/loginform',
            {
                title: 'Login',
                hasErrors: true,
                error: error.message || 'Internal Server Error',
            }
        );
    }
});

module.exports = router;
