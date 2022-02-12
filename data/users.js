const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;
const errorcheck = require('./error');
var validator = require('validator');
const { ObjectId } = require('mongodb');

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
module.exports = {
    async getUserId(username) {
        let userData = {};
        const userColl = await usercollection();
        userData = await userColl.findOne({ username: username });
        return userData._id;
    },
    async getAllUsers() {
        try {
            if (arguments.length !== 0) {
                throwError(
                    ErrorCode.BAD_REQUEST,
                    "Error: This function doesn't require to pass parameters."
                );
            }
            const userColl = await usercollection();
            const allUsers = await userColl.find({}).toArray();
            for (let x of allUsers) {
                x._id = x._id.toString();
            }
            return allUsers;
        } catch (error) {
            throwCatchError(error);
        }
    },
    async getUserById(userId) {
        //console.log(userId)
        try {
            const isString = errorcheck.isArgumentString(userId);
            const isStringEmpty = errorcheck.isStringEmpty(userId);
            const checkobject = errorcheck.validateObjectId(userId);

            const userCollection = await usercollection();
            let user = await userCollection.findOne({
                _id: ObjectId(userId.trim()),
            });
            if (user === null)
                throwError(
                    ErrorCode.NOT_FOUND,
                    'Error: No User Found with given Id.'
                );
            user._id = user._id.toString();

            return user;
        } catch (error) {
            throwCatchError(error);
        }
    },
    async deleteUser(userId) {
        try {
            const isString = errorcheck.isArgumentString(userId);
            const isStringEmpty = errorcheck.isStringEmpty(userId);
            const checkobject = errorcheck.validateObjectId(userId);

            const user = await this.getUserById(userId);
            const userColl = await usercollection();
            const deletedInfo = await userColl.deleteOne({
                _id: ObjectId(user._id),
            });

            if (deletedInfo.deletedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    `Could not delete user with id ${userId}`
                );
            }
            return {
                userId: userId,
                deleted: true,
            };
        } catch (error) {
            throwCatchError(error);
        }
    },
    async updateUser(userId, firstname, lastname, dob, city, state) {
        try {
            const validateArgs = errorcheck.validateArgumentsUpdateUser(
                arguments.length
            );
            const validatedUserId = errorcheck.validateUserId(userId);
            const validatedfirstname = errorcheck.validateFirstname(firstname);
            const validatedlastname = errorcheck.validateLastname(lastname);
            const validatedDob = errorcheck.validateDob(dob);
            const validatedcity = errorcheck.validateCity(city);
            const validatedState = errorcheck.validateState(state);

            const user = await this.getUserById(validatedUserId);
            const updatedUser = {
                firstName: validatedfirstname,
                lastName: validatedlastname,
                email: user.email,
                DateOfBirth: validatedDob,
                City: validatedcity,
                State: validatedState,
                username: user.username,
                password: user.password,
                favorite_item: user.favorite_item,
                reviews: user.reviews,
            };
            const userColl = await usercollection();
            const updatedInfo = await userColl.updateOne(
                { _id: ObjectId(user._id) },
                { $set: updatedUser }
            );
            if (updatedInfo.modifiedCount !== 1) {
                throwError(
                    ErrorCode.INTERNAL_SERVER_ERROR,
                    'Error: Could not update User.'
                );
            }

            return await this.getUserById(validatedUserId);
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
