const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, required: true, enum: ['admin', 'customer'], default: 'customer' },
    password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

module.exports = User