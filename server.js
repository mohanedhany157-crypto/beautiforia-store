const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Allows us to read JSON data sent from frontend)
app.use(express.json());
app.use(cors());

// 1. Serve Static Files (Your HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// 2. API Routes (The Backend Logic)

// GET request to check if server is running
app.get('/api/status', (req, res) => {
    res.json({ message: "Backend is running!" });
});

// POST request to handle Orders
app.post('/api/checkout', (req, res) => {
    const orderData = req.body;
    
    console.log("New Order Received:", orderData);

    // HERE is where we will eventually connect to Firebase or Database.
    // For now, we just send success back to the frontend.
    
    res.json({ 
        success: true, 
        message: "Order received by server!",
        orderId: Math.floor(Math.random() * 100000) // Fake ID for now
    });
});

// 3. Catch-all handler (Sends index.html for any other request)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- SERVER.JS FOR ADMIN ---
const fs = require('fs');
const ORDERS_FILE = 'orders.json';
const ADMIN_PASS = "admin123"; // Set your password here

// Helper to load/save
const getOrders = () => fs.existsSync(ORDERS_FILE) ? JSON.parse(fs.readFileSync(ORDERS_FILE)) : [];
const saveOrder = (o) => { 
    const list = getOrders(); 
    list.unshift(o); 
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2)); 
};

// 1. Update Checkout to ACTUALLY save
app.post('/api/checkout', (req, res) => {
    const order = { ...req.body, orderId: Date.now(), date: new Date().toLocaleString() };
    saveOrder(order); // This saves to file
    res.json({ success: true, orderId: order.orderId });
});

// 2. Admin Route to GET orders
app.get('/api/admin/orders', (req, res) => {
    if (req.headers['x-admin-password'] !== ADMIN_PASS) return res.status(401).send("Unauthorized");
    res.json(getOrders());
});

// 3. Admin Page Route
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});