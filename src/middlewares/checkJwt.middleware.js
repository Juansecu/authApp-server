const { request, response } = require('express');
const { verify } = require('jsonwebtoken');

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.checkJwt = (req, res, next) => {
    const token = req.header('AUTH');

    if (!token)
        return res.status(403).json({
            ok: false,
            message: 'Missing token!'
        });

    try {
        const { firstName, userId } = verify(token, process.env.JWT_SECRET);

        req.userId = userId;
        req.firstName = firstName;
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            ok: false,
            message: 'Invalid token!'
        });
    }

    next();
};
