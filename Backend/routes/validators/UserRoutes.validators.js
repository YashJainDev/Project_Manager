import { check } from 'express-validator';
import User from '../../models/User.js';

const registerValidator = [
        check('username')
            .notEmpty().withMessage("Username is required")
            .isLength({ max: 20 }).withMessage('The username should not be greater than 20 characters')
            .custom(async (username) => {
                const user = await User.findOne({ username });
                if (user) {
                    return Promise.reject("Username already Exists")
                }
            }),
        check('email')
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("Invalid Email")
            .custom(async (email) => {
                const user = await User.findOne({ email });
                if (user) {
                    return Promise.reject("Email already Exists")
                }
            }),
        check('password')
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be less than 8 characters")
];

const loginUser = [];

export default {
    registerValidator,
    loginUser,
}