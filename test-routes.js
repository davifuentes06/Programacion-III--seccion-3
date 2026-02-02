const express = require('express');
const app = express();

app.use(express.json());

// Test route
app.post('/api/products', (req, res) => {
    console.log('POST /api/products called with body:', req.body);
    res.json({ message: 'Test route working', body: req.body });
});

app.listen(3001, () => {
    console.log('Test server running on port 3001');
});