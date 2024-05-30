// Importing the 'mongoose' module and assigning it to the variable 'mongoose'
const mongoose = require('mongoose')

// Defining a new mongoose schema for orders
const orderSchema = new mongoose.Schema({
    ordTransId: { type: String, required: true }, // Defining a field 'ordTransId' of type String which is required
    ordProdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Defining a field 'ordProdId' of type ObjectId referencing the 'Product' model, which is required
    ordQty: { type: Number, required: true }, // Defining a field 'ordQty' of type Number which is required
    ordStatus: { type: String, required: true, enum: ['Pending', 'Rejected', 'Confirmed', 'Completed'], default: 'Pending'}, // Defining a field 'ordStatus' of type String which is required, can only have values 'Pending', 'Rejected', 'Confirmed', or 'Completed', defaults to 'Pending'
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Defining a field 'email' of type ObjectId referencing the 'User' model, which is required
    ordDate: { type: Date, required: true }, // Defining a field 'ordDate' of type Date which is required
    time: { type: Date, required: true} // Defining a field 'time' of type Date which is required
})

const Order = mongoose.model('Order', orderSchema) // Creating a model named 'Order' based on the defined schema

module.exports = Order // Exporting the 'Order' model to be used in other files