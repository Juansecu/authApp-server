const { Router } = require('express');

const {
    addUser,
    login,
    renewToken
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.route('/login').post(login);

usersRouter.route('/register').post(addUser);

usersRouter.route('/renew-token').get(renewToken);

module.exports = usersRouter;
