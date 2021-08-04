const { request, response } = require('express');
const { validationResult } = require('express-validator');

/**
 * @param {request} req
 * @param {response} res
 */
module.exports.checkBody = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });

    next();
};
