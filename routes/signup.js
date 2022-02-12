const express = require('express');
const router = express.Router();
const data = require('../data');
const signupData = data.signup;
const xss = require('xss');
const moment = require('moment');
const errorcheck = data.error;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
router.get('/', async (req, res) => {
    res.render('pages/signup');
});
router.post('/', async (req, res) => {
    try {
        const firstname = xss(req.body.firstName.trim());
        const lastname = xss(req.body.lastName.trim());
        const email = xss(req.body.email.trim());
        let dob = xss(req.body.dateOfBirth.trim());
        const gender = xss(req.body.gender);
        const city = xss(req.body.city.trim());
        const state = xss(req.body.state.trim());
        const username = xss(req.body.username.trim());
        const password = xss(req.body.password.trim());

        dob = moment(dob).format('MM/DD/YYYY');

        const validatedfirstname = errorcheck.validateFirstname(firstname);
        const validatedlastname = errorcheck.validateLastname(lastname);
        const validatedEmail = errorcheck.validateEmail(email);
        const validatedDob = errorcheck.validateDob(dob);
        const validatedcity = errorcheck.validateCity(city);
        const validatedState = errorcheck.validateState(state);
        const validatedUsername = errorcheck.validateUsername(username);
        const validatedPassword = errorcheck.validatePassword(password);

        const createUser = await signupData.createUser(
            validatedfirstname,
            validatedlastname,
            validatedEmail,
            validatedDob,
            gender,
            validatedcity,
            validatedState,
            validatedUsername,
            validatedPassword
        );
        if (!createUser) {
            throw [400, 'Could not create user'];
        }
        res.json({ message: 'success' });
    } catch (error) {
        res.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
module.exports = router;
