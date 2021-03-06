const Api = require('./model')
const router = require('express').Router()
const { validInput, 
        existsApi,
        compareChange
        } = require('../middleware/api-key-middleware')
const { restricted } = require('../middleware/auth-middleware')

router.post('/send', restricted, validInput, (req, res, next) => {
    Api.create(req.api)
        .then(a => { res.json(a) })
        .catch(e => next(e))
})

router.post('/confirm', existsApi, (req, res, next) => {
    Api.getById(req.headers.user_id)
        .then(a => { res.json(a) })
        .catch(e => next(e))
})

router.post('/edit/:exchange_id', existsApi, (req, res, next) => {
    Api.getBy(req.headers.user_id, req.params.exchange_id)
        .then(a => { res.json(a)})
        .catch(e => next(e))
})

router.post('/modify', existsApi, compareChange, (req, res, next) => {
    Api.update(req.headers.user_id, req.changes)
        .then(api => { res.json(api) })
        .catch(e => next(e))
})
router.post('/delete', (req, res, next) => {
    const { user_id, exchange_id } = req.body
    Api.remove({user_id, exchange_id})
        .then(r => res.json(r))
        .catch(e => next(e))
}) 

module.exports = router