const express = require('express')

const router = express.Router()

const orderControl = require('../controllers/orderController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// seed 
router.get('/seed', orderControl.seed)

// index
router.get('/', orderControl.index)

// delete
// router.delete('/:id', authorize, confirmUserAccess, orderControl.delete)
router.delete('/:id', orderControl.delete)

// update
router.put('/:id', authorize, confirmUserAccess, orderControl.update)

// create
router.post('/', authorize, orderControl.create)

// show
router.get('/:id', orderControl.show)

module.exports = router