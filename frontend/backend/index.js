const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoDB = require("./db");

// Connect to MongoDB
mongoDB();

// Fix CORS issue by allowing requests from frontend (http://localhost:5173)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://foodiefly.onrender.com "); // Changed from 3000 to 5173
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


// Root route
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
