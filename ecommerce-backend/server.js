// server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Custom CORS middleware to handle any origin with credentials
app.use((req, res, next) => {
    const origin = req.headers.origin;

    console.log("origin ====== >> ", origin);

    // Allow any origin dynamically by setting the value of 'Access-Control-Allow-Origin' to the request origin
    res.header('Access-Control-Allow-Origin', origin);

    // Allow credentials (cookies, Authorization header, etc.)
    res.header('Access-Control-Allow-Credentials', 'true');

    // Allow these methods for requests
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

    // Allow these headers, including Authorization for token-based authentication
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Send OK status for preflight requests
    }

    next();
});

// app.use(cors());

app.use(express.json()); // For parsing JSON bodies
app.use(morgan('dev'));  // For logging HTTP requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// Base route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to my app' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});