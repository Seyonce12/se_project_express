// middlewares/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UNAUTHORIZED } = require('../utils/errors');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        res.status(UNAUTHORIZED).send({ message: 'Authorization required' });
    } else {
        const token = authorization.replace('Bearer ', '');

        try {
            const payload = jwt.verify(token, JWT_SECRET);
            req.user = payload;
            next();
        } catch (err) {
            res.status(UNAUTHORIZED).send({ message: 'Invalid token' });
        }
    }
};