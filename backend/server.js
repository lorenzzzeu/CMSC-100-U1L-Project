const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const User = require('./model/userSchema')


// Connect to express
const app = express()

// Connect to MongoDB
const dbURI = 'mongodb+srv://100project:1NOQRTS4svS5WIxn@cluster100.n6lrd2x.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster100'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(3001, () => {
        console.log('Server connected to port 3000 and MongoDB')
    })
}).catch((error) =>{
    console.log('Unable to connect to server')
})

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
// User registration
