const { compareSync, hashSync } = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/User');

const { generateJwt } = require('../libs/jwt');

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

        let token;

        user = new User({ email, firstName, lastName, password });
        user.password = hashSync(password, 10);
        token = await generateJwt(user.id, user.firstName);

        await user.save();

        return res.status(201).json({
            ok: true,
            userId: user.id,
            firstName,
            lastName,
            token
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
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user)
            return res.status(401).json({
                ok: false,
                message: 'User not found!'
            });

        const isValidPassword = compareSync(password, user.password);

        if (!isValidPassword)
            return res.status(401).json({
                ok: false,
                message: 'Wrong password!'
            });

        let token = await generateJwt(user.id, user.firstName);

        return res.json({
            ok: true,
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token
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
module.exports.renewToken = (req, res) => {
    res.send((Math.random() * 50).toString());
};
