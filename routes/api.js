const router = require('express').Router();
const { checkToken } = require('./api/middleware')


const apiFilmsRouter = require('./api/films')
const apiUsersRouter = require('./api/users')

router.use('/films', checkToken, apiFilmsRouter)
router.use('/users', apiUsersRouter)

module.exports = router;