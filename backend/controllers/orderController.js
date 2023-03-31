const Orders = require('../models/orderModel')
const Comments = require('../models/commentModel')

const orders = require('../models/orders')

module.exports.seed = async (req, res) => {
    // await Orders.deleteMany({})
    // await Orders.create(orders)
    res.redirect('/orders')
}

module.exports.index = async (req, res) => {
    try {
        const orders = await Orders.find().sort({ createdAt: 1 }).populate('comments')
        res.status(200).json(orders)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        // first find the order, store it in a variable, then delete it from database
        const order = await Orders.findByIdAndDelete(req.params.id)
        // delete all comments where the comment id 
        await Comments.deleteMany({ _id: { 
            // equals/matches any comment ids in this array
            $in: order.comments 
        }})
        res.status(200).json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    try {
        // add a third argument to the update { new: true } to return the new updated version of the document
        const updatedorder = await Orders.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedorder)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.create = async (req, res) => {
    try {
        console.log("new order", req.body)
        const order = await Orders.create(req.body)
        // console.log(order)
        res.status(200).json(order)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    try {
        // populate replaces the ids with actual documents/objects we can use
        const order = await Orders.findById(req.params.id).populate('comments')
        res.status(200).json(order)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}


