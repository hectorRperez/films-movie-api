const router = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const moment = require('moment')
const jwt = require('jwt-simple')

const { User } = require('../../db');

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users)
})

router.post('/register',

    [check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail()
    ],

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ 'errors': errors.array() })
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        res.json(user)
    });

router.post('/login', async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } })

    if (user) {

        const iguales = bcrypt.compareSync(req.body.password, user.password);

        if (iguales) {
            res.send({ 'success': createToken(user) })
        } else {
            res.json({ 'errors': 'Error en usuario y/o contraseña' })
        }

    } else {
        res.json({ 'errors': 'Error en usuario y/o contraseña' })
    }
})

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, 'frase secreta')
}

module.exports = router;