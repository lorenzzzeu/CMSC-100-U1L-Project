const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    prodName: { type: String, required: true },
    prodType: { type: String, required: true },
    prodPrice: { type: Number, required: true },
    prodDesc: { type: String, required: true}, 
    prodQuant: { type: Number, required: true },
    prodImage: { type: String, required: true }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product