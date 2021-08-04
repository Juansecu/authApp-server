const { request, response } = require('express');
const { hashSync } = require('bcryptjs');

const User = require('../models/User');

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.addUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user)
            return res.status(409).json({
                ok: false,
                message: 'User already exists!'
            });

        user = new User({ email, firstName, lastName, password });
        user.password = hashSync(password, 10);

        await user.save();

        return res.status(201).json({
            ok: true,
            userId: user.id,
            firstName,
            lastName
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            error: 'Internal server error. Please contact with the administrator.'
        });
    }
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
