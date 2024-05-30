// Importing the mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose')

// Defining a new mongoose schema for the user data structure.
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },     // Defining a field 'email' of type String, which is required and must be unique.
    firstName: { type: String, required: true }, // Defining a field 'firstName' of type String, which is required.
    lastName: { type: String, required: true }, // Defining a field 'lastName' of type String, which is required.
    userType: { type: String, required: true, enum: ['admin', 'customer'], default: 'customer' }, // Defining a field 'userType' of type String, which is required, and should be either 'admin' or 'customer'. Default value is 'customer'.
    password: { type: String, required: true } // Defining a field 'password' of type String, which is required.
})

const User = mongoose.model('User', userSchema) // Creating a mongoose model named 'User' based on the 'userSchema' schema.

module.exports = User // Exporting the User model so that it can be used in other parts of the application.