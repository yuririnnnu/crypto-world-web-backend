const Order = require('./model')
const router = require('express').Router()
const { validInput,
        existsOrder,
        compareChange
        } = require('../middleware/orders-middleware')
const { restricted } = require('../middleware/auth-middleware')

router.post('/send/:user_id', validInput, (req, res, next) => {
    Order.create(req.order)
        .then(order => { res.json(order) })
        .catch(e => next(e))
})

router.post('/history', restricted, (req, res, next) => {
    Order.getHistory(req.body)
        .then(order => { 
            res.json(order)
        })
        .catch(e => next(e))
})

router.get('/confirm/:order_id', existsOrder, (req, res, next) => {
    res.json(req.order)
})

router.post('/modify/:order_id', existsOrder, compareChange, (req, res, next) => {
    Order.update(req.params.order_id, req.changes)
        .then(order => { res.json(order) })
        .catch(e => next(e))
})

router.post('/cancel/:order_id', existsOrder, (req, res, next) => {
    Order.update(req.params.order_id, req.changes)
        .then(order => { res.json(order) })
        .catch(e => next(e))
})

module.exports = router