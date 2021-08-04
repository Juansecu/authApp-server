const { request, response } = require('express');

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.addUser = (req, res) => {
    res.send('Successfully registered!');
};

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.login = (req, res) => {
    res.send('Successfully logged in!');
};

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.renewToken = (req, res) => {
    res.send((Math.random() * 50).toString());
};
