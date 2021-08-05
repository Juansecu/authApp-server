const { Router } = require('express');
const { check } = require('express-validator');

const { checkBody } = require('../middlewares/checkBody.middleware');
const { checkJwt } = require('../middlewares/checkJwt.middleware');

const {
    addUser,
    login,
    renewToken
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.route('/login').post(
    [
        check('email', 'Email is required!').notEmpty(),
        check('email', 'Email is invalid!').isEmail(),
        check('password', 'Password is required!').notEmpty(),
        check(
            'password',
            'Password is invalid! It must have a minimum length of 8 characters and a maximum length of 20 characters.'
        ).isLength({
            min: 8,
            max: 20
        }),
        checkBody
    ],
    login
);

usersRouter
    .route('/register')
    .post(
        [
            check('email', 'Email is required!').notEmpty(),
            check('email', 'Email is invalid!').isEmail(),
            check('firstName', 'First name is required!').notEmpty(),
            check(
                'firstName',
                'First name is invalid! It can only contain letters and have a minimum length of 3 characters and a maximum length of 15 characters.'
            )
                .isAlpha()
                .isLength({ min: 3, max: 15 }),
            check('lastName', 'Last name is required!').notEmpty(),
            check(
                'lastName',
                'Last name is invalid! It can only contain letters and have a minimum length of 2 characters and a maximum length of 15 characters.'
            )
                .isAlpha()
                .isLength({ min: 2, max: 15 }),
            check('password', 'Password is required!').notEmpty(),
            check(
                'password',
                'Password is invalid! It must have a minimum length of 8 characters and a maximum length of 20 characters.'
            ).isLength({ min: 8, max: 20 }),
            checkBody
        ],
        addUser
    );

usersRouter.route('/renew-token').get([checkJwt], renewToken);

module.exports = usersRouter;
