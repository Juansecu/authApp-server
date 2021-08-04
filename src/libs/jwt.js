const { sign } = require('jsonwebtoken');

const generateJwt = (userId, firstName) => {
    const payload = { userId, firstName };

    return new Promise((resolve, reject) => {
        sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
};

module.exports = { generateJwt };
