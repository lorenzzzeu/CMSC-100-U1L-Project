const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    ordTransId: { type: String, required: true },
    ordProdId: { type: String, required: true },
    ordQty: { type: Number, required: true },
    ordStatus: { type: String, required: true}, 
    email: { type: String, required: true },
    ordDate: { type: Date, required: true },
    time: { type: TimeRanges, required: true}
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order