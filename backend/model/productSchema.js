// Importing the 'mongoose' library/module and assigning it to the variable 'mongoose'.
const mongoose = require('mongoose')

// Creating a new Mongoose schema for defining the structure of a product.
const productSchema = new mongoose.Schema({
    prodName: { type: String, required: true }, // Defining a property 'prodName' of type String which is required.
    prodType: { type: String, required: true }, // Defining a property 'prodType' of type String which is required.
    prodPrice: { type: Number, required: true }, // Defining a property 'prodPrice' of type Number which is required.
    prodDesc: { type: String, required: true}, // Defining a property 'prodDesc' of type String which is required.
    prodQuant: { type: Number, required: true }, // Defining a property 'prodQuant' of type Number which is required.
    prodImage: { type: String, required: true } // Defining a property 'prodImage' of type String which is required.
})

const Product = mongoose.model('Product', productSchema) // Creating a Mongoose model named 'Product' based on the productSchema.

module.exports = Product // Exporting the 'Product' model to be used in other files.