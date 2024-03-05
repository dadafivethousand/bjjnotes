const jwt = require('jsonwebtoken');

const jwtSecret = 'your_jwt_private_key'; // Use an environment variable in production

module.exports = function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};