const { ObjectId } = require('mongodb');
var validator = require('validator');
var moment = require('moment');
moment().format();

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
/*****************************************************************************************/
const validateArgumentsCheckuser = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 2;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};
/*****************************************************************************************/
const validateArgumentsCreateUser = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 9;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};
/*****************************************************************************************/
const validateArgumentsCreateReview = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 4;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};
/*****************************************************************************************/
const validateArgumentsUpdateUser = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 6;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};
/*****************************************************************************************/
const validateUsername = (name) => {
    isArgumentString(name, 'username');
    isStringEmpty(name, 'username');
    name = name.trim();
    checkspace(name);
    let checkvaliduser = /[A-Za-z0-9]{4,}/g;
    if (!checkvaliduser.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Format for username provided, Atleast 4 Characters and no spaces allowed.'
        );
    }
    return name.trim();
};
/*****************************************************************************************/
const validatePassword = (pass) => {
    isArgumentString(pass, 'password');
    isStringEmpty(pass, 'password');
    pass = pass.trim();
    checkspace(pass);
    let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;
    if (!checkvalidpass.test(pass)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid format for Password provided,Atleast 6 Characters and no Alphanumeric allowed.'
        );
    }
    return pass.trim();
};
/*****************************************************************************************/
const validateFirstname = (name) => {
    isArgumentString(name, 'Firstname');
    isStringEmpty(name, 'Firstname');
    name = name.trim();
    checkspace(name);
    let validnameregex = /[a-zA-Z]/g;
    if (!validnameregex.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid first name. Expected alphabets only'
        );
    }
    return name.trim();
};
/*****************************************************************************************/
const validateLastname = (name) => {
    isArgumentString(name, 'Lastname');
    isStringEmpty(name, 'Lastname');
    name = name.trim();
    checkspace(name);
    let validnameregex = /[a-zA-Z]/g;
    if (!validnameregex.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid last name. Expected alphabets only'
        );
    }
    return name.trim();
};
/*****************************************************************************************/
const validateEmail = (email) => {
    isArgumentString(email, 'Email');
    isStringEmpty(email, 'Email');
    email = email.trim();
    if (!validator.isEmail(email)) {
        throwError(ErrorCode.BAD_REQUEST, 'Invalid Email provided');
    }
    return email.trim();
};
/*****************************************************************************************/
const validateDob = (dob) => {
    isArgumentString(dob, 'DateofBirth');
    isStringEmpty(dob, 'DateofBirth');
    dob = dob.trim();
    if (!moment(dob, 'MM/DD/YYYY', true).isValid()) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Date Format in provided variable. Expected in MM/DD/YYYY format'
        );
    }
    if (moment().diff(moment(dob, 'MMDDYYYY'), 'years') < 13) {
        throwError(ErrorCode.BAD_REQUEST, 'Age cannot be less than 13 years');
    }
    return dob.trim();
};
/*****************************************************************************************/
const validateDate = (date) => {
    isArgumentString(date, 'Current date');
    isStringEmpty(date, 'Current date');
    date = date.trim();
    const dateformat = moment(date, 'MM/DD/YYYY').isValid();
    if (!dateformat) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Date Format in provided variable. Expected in MM/DD/YYYY format'
        );
    }
    return date.trim();
};
/*****************************************************************************************/
const validateCity = (city) => {
    isArgumentString(city, 'City');
    isStringEmpty(city, 'City');
    city = city.trim();
    let regex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if (!regex.test(city)) {
        throwError(ErrorCode.BAD_REQUEST, 'Invalid City format provided');
    }
    return city.trim();
};
/*****************************************************************************************/
const validateState = (state) => {
    isArgumentString(state, 'state');
    isStringEmpty(state, 'state');

    state = state.trim();
    let regex = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i;
    if (!regex.test(state)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid State format provided, Expected Only Initials Like NJ,NY'
        );
    }
    return state.trim();
};
/*****************************************************************************************/
const validateUserId = (UserId) => {
    isArgumentString(UserId, 'id');
    isStringEmpty(UserId, 'id');
    validateObjectId(UserId);

    return UserId.trim();
};
/*****************************************************************************************/
const validateRating = (rating) => {
    if (!rating) throwError(ErrorCode.BAD_REQUEST, 'Rating not Provided');
    if (typeof rating !== 'number') {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Rating format provided, Only Numbers allowed'
        );
    }
    if (rating < 0 || rating > 5)
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Rating provided, Ratings Only range between 1 to 5'
        );
    return rating;
};
/*****************************************************************************************/
const validateReview = (review) => {
    isArgumentString(review, 'review');
    isStringEmpty(review, 'review');

    return review.trim();
};
/*****************************************************************************************/
const isArgumentString = (str, variableName) => {
    if (typeof str !== 'string') {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Invalid argument passed for ${
                variableName || 'provided variable'
            }. Expected string.`
        );
    }
};
/*****************************************************************************************/
const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Empty string passed for ${variableName || 'provided variable'}.`
        );
    }
};
/*****************************************************************************************/
const checkspace = (string, variableName) => {
    let checkspace = /(\s)/g;
    if (checkspace.test(string))
        throwError(
            ErrorCode.BAD_REQUEST,
            ` Invalid argument passed, spaces not allowed `
        );
};
/*****************************************************************************************/
const validateObjectId = (id) => {
    //should match 24 length Hex string
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;

    if (!ObjectId.isValid(id) || !objectIdRegex.test(id)) {
        throwError(ErrorCode.BAD_REQUEST, ' id is not a valid ObjectId.');
    }

    return ObjectId(id);
};
/*****************************************************************************************/
const throwError = (code = 404, message = 'Not found') => {
    throw { code, message };
};
/*****************************************************************************************/
const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Error: Internal server error.'
    );
};
/*****************************************************************************************/
const validateReviewId = (reviewId) => {
    isArgumentString(reviewId, 'id');
    isStringEmpty(reviewId, 'id');

    return reviewId.trim();
};
/*****************************************************************************************/
module.exports = {
    validateArgumentsCheckuser,
    validateArgumentsCreateUser,
    validateArgumentsCreateReview,
    isArgumentString,
    isStringEmpty,
    validateObjectId,
    throwCatchError,
    throwError,
    validateUsername,
    checkspace,
    validatePassword,
    validateFirstname,
    validateLastname,
    validateEmail,
    validateDob,
    validateCity,
    validateState,
    validateDate,
    validateUserId,
    validateRating,
    validateReview,
    validateArgumentsUpdateUser,
    validateReviewId,
};
