const { Router } = require('express');

const usersRouter = Router();

usersRouter.route('/login').post((req, res) => {
    res.send('Logged in successfully!');
});

usersRouter.route('/register').post((req, res) => {
    res.send('Registered successfully!');
});

usersRouter.route('/renew-token').get((req, res) => {
    res.send((Math.random() * 50).toString());
});

module.exports = usersRouter;
