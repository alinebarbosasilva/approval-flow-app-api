const jwt = require('jsonwebtoken');
const { SECRET } = require('../controllers/auth.controllers')

const authMiddleware = (req, res, next) => {
    const authentication = req.headers['authorization'];

    if (!authentication) {
        return res.status(403).send({ auth: false, message: 'Token não encontrado.' });
    }

    const token = authentication.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;