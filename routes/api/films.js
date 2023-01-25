const router = require('express').Router();
const { Film } = require('../../db')


router.get('/', async (req, res) => {
    const fimls = await Film.findAll();
    res.json(fimls)
})

router.post('/', async (req, res) => {
    const film = await Film.create(req.body)
    res.json(film)
})

router.put('/:idFilm', async (req, res) => {
    await Film.update(req.body, {
        where: { id: req.params.idFilm }
    })

    res.json({ success: 'Se ha modificado correctamente' })
})

router.delete('/:idFim', async (req, res) => {
    await Film.destroy({
        where: {
            id: req.params.idFim
        }
    })

    res.json({ success: 'Se ha eliminado correctamente' })
})

module.exports = router;