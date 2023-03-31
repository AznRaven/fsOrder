const Orders = require('../models/orderModel')
const Comments = require('../models/commentModel')

module.exports.createComment = async (req, res) => {
    try {
        // create a document in our comments collection
        const comment = await Comments.create(req.body)
        // find the order 
        await Orders.findByIdAndUpdate(req.params.pid, {
            // and push the new comment document's id
            $push: {
                // to the order's comments field/property
                comments: comment._id
            }
        })
        res.status(200).json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        // first use the id to delete the comment from the comments collection
        await Comments.findByIdAndDelete(req.params.id)
        // then use the order's id to find the order
        await Orders.findByIdAndUpdate(req.params.pid, {
            // and pull/remove the reference id (to the comment) from
            $pull: {
                // the comments array
                comments: req.params.id
            }
        })
        res.json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.indexComment = async (req, res) => {
    try {
        // target the comments property 
        const order = await Orders.findById(req.params.pid).populate('comments')
        res.json(order.comments)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.showComment = async (req, res) => {
    try {
        // find the order and filter it's comments property array
        const comment = await Comments.findById(req.params.id)
        res.json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        // update a comment by updating an item in the comments property in order
        await Comments.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}