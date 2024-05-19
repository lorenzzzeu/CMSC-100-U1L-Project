const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    ordTransId: { type: String, required: true },
    ordProdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    ordQty: { type: Number, required: true },
    ordStatus: { type: String, required: true}, 
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ordDate: { type: Date, required: true },
    time: { type: Date, required: true}
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order