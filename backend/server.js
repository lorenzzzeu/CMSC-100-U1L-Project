const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./model/userSchema')
const Product = require('./model/productSchema')

const SECRET_KEY = 'secretkey' // Must be in .env file

// Connect to express
const app = express()

// Connect to MongoDB
const dbURI = 'mongodb+srv://100project:1NOQRTS4svS5WIxn@cluster100.n6lrd2x.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster100'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(3001, () => {
        console.log('Server connected to port 3001 and MongoDB')
    })
}).catch((error) =>{
    console.log('Unable to connect to server')
})

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
// User registration
// Post
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ firstName, lastName, email, password:hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully'})
    } catch(error) {
        res.status(500).json({ server: 'Error signing up' })
    }
})

// Get
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    } catch(error) {
        res.status(500).json({ message: 'Unable to get users' })
    }
})

// Log in
// Post
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid password' })
        }
        const token = jwt.sign({ userId: user._id}, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful '})
    } catch(error) {
        res.status(500).json({ error: 'Error logging in' })
    }
})

//Products 
// Get
app.get('/product-list', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(201).json(products)
    } catch(error) {
        res.status(500).json({ message: 'Unable to get products' })
    }
})

app.post('/product-list', async (req, res) => {
    try {
        const { prodType } = req.body
        const product = await Product.find({prodType})
        if(!product){
            return res.status(401).json({ error: 'No products found' })
        }
        res.status(200).json(product)
        
    } catch(error) {
        res.status(500).json({ error: 'Error in database' })
    }
})
