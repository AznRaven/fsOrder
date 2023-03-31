
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
   table: { type: Number},
   completed: { type: Boolean, default: false },
   paid: { type: Boolean, default: false },
   user: { type: String, required: true },
   comments: [{
      // an id referencing the comment
      type: mongoose.Types.ObjectId,
      // search for it in the Comments collection
      ref: 'Comment'
   }]
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order