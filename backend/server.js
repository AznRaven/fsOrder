// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

const cors = require('cors')

// Setup our Express app
const app = express()

const PORT = 8080 

// Load the connectDB function
const connectDB = require('./config/db')

// Connect to database
connectDB()

const orderRoutes = require('./routes/orderRoutes')
const commentRoutes = require('./routes/commentRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/orders', orderRoutes)
// "/p/" stands for order and all comment routes need a reference to their order
app.use('/comments/p/', commentRoutes)
app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})