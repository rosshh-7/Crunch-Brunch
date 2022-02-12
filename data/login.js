const { object } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;
const errorcheck = require('./error');
const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function checkUser(username, password) {
    let comparePass = false;
    try {
        const validateArgs = await errorcheck.validateArgumentsCheckuser(
            arguments.length
        );
        const validateUsername = await errorcheck.validateUsername(username);
        const validatePassword = await errorcheck.validatePassword(password);

        let usernameLower = username.trim().toLowerCase();
        const userColl = await usercollection();
        const finduser = await userColl.findOne({ username: usernameLower });
        if (finduser) {
            comparePass = await bcrypt.compare(password, finduser.password);
            if (comparePass) {
                return { authenticated: true };
            } else {
                throwError(
                    ErrorCode.BAD_REQUEST,
                    'Either the username or password is invalid'
                );
            }
        } else {
            throwError(ErrorCode.NOT_FOUND, 'No user found');
        }
    } catch (error) {
        throwCatchError(error);
    }
}
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

module.exports = { checkUser };
