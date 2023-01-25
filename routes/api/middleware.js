const jwt = require("jwt-simple")
const moment = require('moment')

const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.json({ 'errores': 'Necesitas incluir el user-token en el header' })
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'frase secreta')
        console.log(payload);
    } catch (error) {
        return res.json({ 'error': 'El token es incorrecto' })
    }

    console.log(payload.expiredAt);
    if (payload.expiredAt < moment().unix()) {
        return res.json({ 'error': 'El tiempo ha expirado' })
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = {
    checkToken,
}