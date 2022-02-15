// Dependencies
const jwt = require('jsonwebtoken');
const messages = require('../helpers/messages');

function auth(req, res, next) {
    // Retrieves token from header
    let token = req.headers.authorization;

    // If the user has no token, action fails
    if (!token) {
        res.status(511).json({ message: messages.protectedRoute });
        return;
    }

    // If the token is invalid, action fails. If its valid, action continues
    try {
        const privateKey = process.env.TOKEN_PRIVATE_KEY;
        token = token.replace('Bearer ', '');
        jwt.verify(token, privateKey);
        next();
    } catch (err) {
        res.status(403).json({ message: messages.invalidToken });
        return;
    }
}

// Export
module.exports = auth;
