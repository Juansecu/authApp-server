const express = require('express');

const usersRouter = require('./users.routes');

const routes = express();

routes.use('/users', usersRouter);

module.exports = routes;
