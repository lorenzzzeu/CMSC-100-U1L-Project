const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    prodID: { type: Number, required: true },
    prodName: { type: String, required: true },
    prodType: { type: String, required: true },
    prodPrice: { type: Number, required: true },
    prodDesc: { type: String, required: true}, 
    prodQuant: { type: Number, required: true }
})

const Product = mongoose.model('Product', userSchema)

module.exports = Product