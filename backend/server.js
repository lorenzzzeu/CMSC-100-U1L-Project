// Import required modules
const express = require('express'); // Express.js framework
const mongoose = require('mongoose'); // MongoDB ODM
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const bodyParser = require('body-parser'); // Parse incoming request bodies
const bcrypt = require('bcrypt'); // Password hashing library
const jwt = require('jsonwebtoken'); // JSON Web Token implementation
const User = require('./model/userSchema'); // User model/schema
const Product = require('./model/productSchema'); // Product model/schema
const Order = require('./model/orderSchema'); // Order model/schema
const { v4: uuidv4 } = require('uuid'); // Generate UUIDs
const validator = require('validator'); // Data validation library
require('dotenv').config(); // Load environment variables

// Connect to express
const app = express()

// Connect to MongoDB
const dbURI = process.env.passDB // MongoDB connection URI

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

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routes
// User registration
// Post
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; // Extract user data from request body
        
        // Validate email format
        if (!validator.isEmail(email)) { 
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ error: 'Email already exists' });
        }

        // Validate password length
        if(password.length < 8){
            return res.status(401).json({ error: 'Password must be at least 8 characters'})
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword }); // Create new user
        await newUser.save(); // Save user to database
        res.status(201).json({ message: 'User created successfully' });  // Respond with success message
    } catch (error) { // Handle errors
        res.status(500).json({ error: 'Error signing up' });
    }
});

// Get all users route
app.get('/register', async (req, res) => {
    try {
        const users = await User.find() // Find all users
        res.status(201).json(users) // Respond with users
    } catch(error) {
        res.status(500).json({ message: 'Unable to get users' }) // Handle errors
    }
})

// Log in
// Post
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body // Extract email and password from request body
        const user = await User.findOne({ email }) // Find user by email
        
        // Check if user exists
        if(!user){
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){ // Check if password is valid
            return res.status(401).json({ error: 'Invalid password' })
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id, type: user.userType}, process.env.ACCESS_SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful ', token }) // Respond with success message and token
    } catch(error) { // Handle errors
        res.status(500).json({ error: 'Error logging in' })
    }
})

// Verify token; Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Extract JWT token from request headers
  
    // Check if token exists
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract token
  
      // Verify token
      if (token) {
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
          if (err) {
            return res.status(403).json({ message: 'Forbidden' }); // If token is invalid, respond with forbidden error
          }
          req.user = user;  // If token is valid, set user in request object and call next middleware
          next();
        });
      } else {
        return res.status(401).json({ message: 'Unauthorized' }); // If no token is provided, respond with unauthorized error
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' }); // If no authorization header is provided, respond with unauthorized error
    }
  };

// Update user profile
app.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated request
        const user = await User.findById(userId).select('-password'); // Find user by userId and exclude password from response
        
        // If user not found, respond with 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Respond with user data
    } catch (error) { // Handle errors
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Update user profile route
app.put('/profile', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated request
        const updateData = req.body; // Extract updated data from request body

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password'); // Find user by userId and update profile data, excluding password from the response

        // If user not found, respond with 404
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

         // Respond with success message and updated user data
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) { // Handle errors
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Products routes
// Get all products route
app.get('/product-list', async (req, res) => {
    try {
        const products = await Product.find() // Find all products
        res.status(201).json(products) // Respond with products
    } catch(error) { // Handle errors
        res.status(500).json({ message: 'Unable to get products' })
    }
})

// Filter products by type route
app.post('/product-list', async (req, res) => {
    try {
        const { prodType } = req.body // Extract product type from request body
        const product = await Product.find({prodType}) // Find products by type

        // If no products found, respond with error
        if(!product){
            return res.status(401).json({ error: 'No products found' })
        }
        res.status(200).json(product)  // Respond with filtered products

    } catch(error) {
        res.status(500).json({ error: 'Error in database' })
    }
})

// Update product quantity route
app.post('/update-product-quantity', async (req, res) => {
    try {
      const { _id, prodQuant } = req.body; // Extract product ID and quantity from request body
  
      // Find the product by ID and update its quantity
      await Product.findByIdAndUpdate(_id, { prodQuant });
  
      res.status(200).json({ message: 'Product quantity updated successfully' }); // Respond with success message
    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Admin routes
// Add product route
app.post('/admin-page/product-listings', async (req, res) => {
    try {
        const { prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage } = req.body; // Extract product details from request body
        const newProduct = new Product({ prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage }); // Create new product instance
        await newProduct.save(); // Save product to database
        res.status(201).json({ message: 'Product added successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Get all products route for admin
app.get('/admin-page/product-listings', async (req, res) => {
    try {
        const products = await Product.find();  // Find all products
        res.status(200).json(products);  // Respond with products
    } catch (error) {
        res.status(500).json({ message: 'Unable to get users' });
    }
});

// Update product route for admin
app.put('/admin-page/product-listings/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters
        const { prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage } = req.body; // Extract updated product data from request body
        
        // Find and update product by ID
        const updatedProd = await Product.findByIdAndUpdate(
            id, 
            { prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage },
            { new: true }
        );

        // If product not found, respond with 404
        if (!updatedProd) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProd }); // Respond with success message and updated product data
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users route for admin
app.get('/admin-page/listusers', async (req, res) => {
    try{
        const users = await User.find() // Find all users
        res.status(200).json(users) // Respond with users
    } catch (error){
        res.status(500).json({ message: 'Unable to get users' })
    }
})

// Delete product route for admin
app.delete('/admin-page/product-listings/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Extract product ID from request parameters
        await Product.findByIdAndDelete(id); // Find and delete product by ID
        res.status(200).json({ message: 'Product deleted successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Admin order routes
// Get all orders route for admin
app.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find(); // Find all orders
        res.status(200).json(orders); // Respond with orders
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Confirm order route for admin
app.put('/admin/orders/confirm', async (req, res) => {
    try {
      const { orderId } = req.body; // Extract order ID from request body
      const order = await Order.findByIdAndUpdate(orderId, { ordStatus: 'Confirmed' }); // Find and update order status to 'Confirmed'
  
      // If order not found, respond with 404
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order confirmed successfully', order }); // Respond with success message and updated order data
    } catch (error) {
      console.error('Error confirming order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Complete order route for admin
  app.put('/admin/orders/complete', async (req, res) => {
    try {
      const { orderId } = req.body; // Extract order ID from request body
      const order = await Order.findByIdAndUpdate(orderId, { ordStatus: 'Completed' });  // Find and update order status to 'Completed'
  
     // If order not found, respond with 404
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Respond with success message and updated order data
      res.status(200).json({ message: 'Order completed successfully', order });
    } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Reject order route for admin
  app.put('/admin/orders/reject', async (req, res) => {
    try {
      const { orderId } = req.body; // Extract order ID from request body
      const order = await Order.findByIdAndUpdate(orderId, { ordStatus: 'Rejected' }); // Find and update order status to 'Rejected'
  
      // If order not found, respond with 404
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order rejected successfully', order });  // Respond with success message and updated order data
    } catch (error) {
      console.error('Error rejecting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Shopping cart routes
let userCarts = {}; // Define object to store user carts

// GET for shopping cart items
app.get('/cart-items', authenticateJWT, (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated request
        const cartItems = userCarts[userId] || []; // Get cart items for the user or an empty array if no items
        res.json(cartItems); // Respond with cart items
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add item to shopping cart route
// POST for shopping cart
app.post('/cart-items', authenticateJWT, (req, res) => {
    try{
        const userId = req.user.userId; // Extract userId from authenticated request
        const newItem = req.body; // Extract new item from request body

         // If user cart doesn't exist, create it
        if (!userCarts[userId]) {
            userCarts[userId] = [];
        }
        
        // Check if item already exists in cart
        const existingItemIndex = userCarts[userId].findIndex(item => item.prodId === newItem.prodId);
        if (existingItemIndex !== -1) {
            userCarts[userId][existingItemIndex].prodQuant += newItem.prodQuant; // If item exists, update its quantity
        } else {
            userCarts[userId].push(newItem); // If item doesn't exist, add it to the cart
        }
        
        res.status(201).json(userCarts[userId]); // Respond with updated cart items
    }catch(err){
        res.status(403).json({ message: 'Forbidden' })
    }
});

// DELETE for shopping cart
// Remove item from shopping cart route
app.delete('/remove-cart-item', authenticateJWT, (req, res) => {
    try {
      const userId = req.user.userId; // Extract userId from authenticated request
      const { prodId } = req.body; // Extract productId from request body

    // If user cart doesn't exist, respond with 404
      if (!userCarts[userId]) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Remove item from cart
      userCarts[userId] = userCarts[userId].filter(item => item.prodId !== prodId);
      res.status(200).json(userCarts[userId]); // Respond with updated cart items
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST for order transaction
// Place order route
app.post('/order-transaction', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated request
        const cartItems = userCarts[userId]; // Get cart items for the user

        // If cart is empty, respond with 404
        if (!cartItems || cartItems.length === 0) { 
            return res.status(404).json({ message: 'Cart is already empty' });
        }

        // Generate unique transaction ID and save each cart item as an order
        const orders = cartItems.map(item => {
            let genId = uuidv4();
            let uniqueId = 'FTT' + genId.slice(0, 6).toUpperCase();
            return {
                ordTransId: uniqueId,
                ordProdId: item.prodId,
                ordQty: item.prodQuant,
                email: userId,
                ordDate: new Date(),
                time: new Date().toISOString()
            };
        });

        // Insert orders into database
        Order.insertMany(orders);

        // Clear the user's cart
        userCarts[userId] = [];

        // Respond with success message
        res.status(200).json({ message: 'All cart items have been removed and orders placed' });
    } catch (error) {
        console.error('Error clearing cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get order transactions route
app.get('/order-transaction', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from authenticated request
        const orders = await Order.find({email: userId}); // Find order transactions for the user

        // If no orders found, respond with 404
        if (!orders.length) {
            return res.status(404).json({ message: 'No order transactions found for this user' });
        }

        res.status(200).json(orders); // Respond with order transactions
    } catch (error) {
        console.error('Error fetching order transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Cancel order route
app.delete('/order-transaction', authenticateJWT, async (req, res) => {
    try {
      const { orderId } = req.body; // Extract orderId from request body
      const userId = req.user.userId; // Extract userId from authenticated request
  
      const order = await Order.findOne({ ordTransId: orderId, email: userId }); // Find and delete order by orderId and userId
      
      // If order not found, respond with 404
      if (!order) {
        return res.status(404).json({ message: 'Order not found or unauthorized' });
      }
  
      await Order.findOneAndDelete({ ordTransId: orderId });
  
      res.status(200).json({ message: 'Order cancelled successfully' }); // Respond with success message
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
